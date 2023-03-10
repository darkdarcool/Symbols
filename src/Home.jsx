import React from "react"
import layout from "./utils/layout.js"
import CodeView from "./CodeView.jsx"

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFile: {
        type: null,
        data: null,
      }
    }
    
  }
  async componentDidMount() {
    await this.getCurrentFile()

    this.interval = setInterval(this.getCurrentFile, 1500) // every 1.5 seconds
  }
  componentWillUnmount() {
    clearInterval(this.interval); // avoids memory leaks
  }
  render() {
    let currentFile = this.state.currentFile;
    return (
      <div>
        {currentFile.type != null ? (
          <CodeView fp={currentFile.data.path} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  getCurrentFile = async () => {
    let currentOpenFile = await layout.getCurrentOpenFile()
    this.setState({currentFile: currentOpenFile});
  }
}