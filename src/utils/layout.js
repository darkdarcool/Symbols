import * as replit from '@replit/extensions';


class Layout {
  async getCurrentOpenFile() {
    let currentLayout = await replit.layout.getLayoutState();
    let panes = currentLayout.layout.tiling.children[0];
    let activeFileIndex = panes.activeIndex;
    let paneId = panes.panes[activeFileIndex]; // the code file id in the replit editor
    return currentLayout.data[paneId]
    
  }
}

export default new Layout();