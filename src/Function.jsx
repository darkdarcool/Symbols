import * as replit from '@replit/extensions';
import React from 'react';
function CSSstring(string) {
  const css_json = `{"${string
    .replace(/; /g, '", "')
    .replace(/: /g, '": "')
    .replace(";", "")}"}`;

  const obj = JSON.parse(css_json);

  const keyValues = Object.keys(obj).map((key) => {
    var camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
    return { [camelCased]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}


export default function Function(props) {
  let func = props.func;
  var parent = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
  let hasChildren = false
  if (func.children.length != 0) hasChildren = true; // has nested stuff
  let children = [...func.children];
    const [showFuncChildren, setShowFuncChildren] = React.useState(true)
  let onClick = () => {
    setShowFuncChildren(!showFuncChildren)
  }
  let focus = () => {
    if (props.isChild != true) {
      props.focus(props.index, props.shouldEnlarge);
    }
  }
  let spacing = "";
  if (props.addTab) spacing = "margin-left: 30px; cursor: pointer;"
  let arrow = "⬇️";
  if (showFuncChildren) arrow = "➡️";
  
  return (
    <div>
        {!hasChildren ? (
          <div>
            <div style = {spacing != "" ? CSSstring(spacing) : {}} className="func-type">{func.type} <span className = "func-name">{func.name}</span>({func.params.join(", ")})
            </div>
            </div>
        ) : (
      <div>
          <div style = {spacing != "" ? CSSstring(spacing) : {}} onClick = {focus} className="func-type-hover">{func.type} <span className = "func-name">{func.name}</span>({func.params.join(",")})</div>
        {props.shouldEnlarge ? (
          <div>
            {props.func.children.map((func, i) => {
            return <Function func = {func} index = {i} focus = {props.focus} shouldEnlarge = {false} addTab = {true} isChild = {true} />
            })}
          </div>
        ) : (
          <p></p>
        )}
          </div>
        )}
    </div>
  )
}

/*

.func-with-children-type {
    color: #c5a5ff;
    font-size: 13px;
}

.func-child-name {
  font-size: 13px;
}
*/