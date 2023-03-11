import * as walk from "acorn-walk";
import * as jsxwalk from "acorn-jsx-walk";

class Code {
  extractOnce(elem) {
     let rawParams = elem.params;
    let extract = new Code().extractOnce

    
    let params = []
    if (rawParams.length != 0) {
      rawParams.forEach(param => {
        params.push(param.name)
      })
    }
    // get nested data
    return { type: "function", name: elem.id.name, isAsync: elem.async, params: params }
  }
  
  extractFunc(elem) {
    if (elem == undefined) return;
    if (elem.params == undefined) return;
    let rawParams = elem.params;
    let extract = new Code().extractFunc
    let params = []
    if (rawParams.length != 0) {
      rawParams.forEach(param => {
        params.push(param.name)
      })
    }
    // get nested data
    let children = []
    jsxwalk.extend(walk.base);
    walk.simple(elem.body, {
      FunctionDeclaration(node) {
        children.push(extract(node));
      }
    })
    return { type: "function", name: elem.id.name, isAsync: elem.async, params: params, children: children }
  }
  getFunctionDecs(tree) {
    let body = tree.body;
    // console.log(JSON.stringify(body))
    let funcs = [];
    body.forEach(elem => {
      let func = undefined;
      console.log(elem);
      if (elem.type == "FunctionDeclaration") {
        funcs.push(this.extractFunc(elem))
      }
      else if (elem.type == "ExportNamedDeclaration" || elem.type == "ExportDefaultDeclaration") {
        elem = elem.declaration;
        if (elem.type == "FunctionDeclaration") funcs.push(this.extractFunc(elem));
        else if (elem.type == "ClassDeclaration") funcs.push(this.extractClass(elem.body.body, elem))
        
      } else if (elem.type == "ClassDeclaration") {
       funcs.push(this.extractClass(elem.body.body, elem))
      }
      if (func != undefined) funcs.push(func)

    })
    return funcs;
    
  }
  extractClass(elem, classData) {
    let children = [];
        elem.forEach(item => {
          if (item.type == "MethodDefinition") {
            item.value.id = item.key; // because dumb
            children.push(this.extractFunc(item.value))
          }
        });
    return { type: "class", children: children, isAsync: false, params: [], name: classData.id.name }
  }
}

export default new Code()