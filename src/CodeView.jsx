import React from "react"
import fs from "./utils/fs.js"
import * as acorn from "acorn"
import jsx from "acorn-jsx"
import acornClassFields from "acorn-class-fields"
import code from "./utils/code.js"
import Function from "./Function.jsx"
import getRepl from "./utils/repl.js"

function getFunctions(content) {
  if (!content) return ""
  let parser = acorn.Parser.extend(jsx()).extend(acornClassFields)
  let data = ""
  try {
   data = parser.parse(content.toString(), {module: true, sourceType: 'module'});
  } catch(e) {
    throw e;
  }
  return code.getFunctionDecs(data);
}

export default class CodeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: undefined,
      isFocused: false,
      focused: undefined
    }
  }

  async componentDidMount() {
    this.interval = setInterval(this.getContent, 1500);
  }

  getContent = async () => {
    let content = await fs.readFile(this.props.fp)
    this.setState({ content })
  }

  async componentWillUnmount() {
    clearInterval(this.interval)
  }

  focus = (index) => {
    let symbols = getFunctions(this.state.content);
    this.setState({ isFocused: true, focused: index })
  }
  render() {
    let symbols = [];
    try {
     symbols = getFunctions(this.state.content)
    } catch(e) {
      console.log("Error parsing code");
      console.error(e); // log error
      return (
        <div>
          <h2>{this.props.fp}</h2>
        <p>Error parsing code</p>
          <p> {e.toString()} </p>
          </div>
      )
    }
    if (!symbols) return 
    let didFocus = false;
    let symbolsList = symbols.map((func, i) => {
      
      if (i == this.state.focused) {
        didFocus = true;
        return <Function focus = {this.focus} func = {func} index = {i} fp = {this.props.fp} shouldEnlarge = {true} />
      }
      if (!this.state.focused && !didFocus) {
        
        return <Function focus = {this.focus} func={func} index = {i} fp = {this.props.fp} shouldEnlarge = {this.state.isFocused}/>
      }
    });
    let backOnClick = () => {
      this.setState({focused: undefined, isFocused: false })
    }
    return (
      <div>
        {didFocus ? (
          <button className = "back_button" onClick = {backOnClick}>{"<---"}</button>
        ) : (
          <div></div>
        )}
        <h2>{this.props.fp}</h2>
       {symbolsList}
      </div>
    )
  }
}