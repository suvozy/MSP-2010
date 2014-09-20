
function Telligent_TabSet(varName,containerId,stateId,cssClass,tabCssClasses,tabSelectedCssClasses,tabHoverCssClasses,onTabSetResizeFunction,enableResizing,tabs)
{this._variableName=varName;this._container=document.getElementById(containerId);this._state=document.getElementById(stateId);this.CssClass=cssClass;this.TabCssClasses=tabCssClasses;this.TabSelectedCssClasses=tabSelectedCssClasses;this.TabHoverCssClasses=tabHoverCssClasses;this.OnTabSetResizeFunction=onTabSetResizeFunction;this._selectedTab=null;this._selectedTabRow=null;this._tabs=new Array();this._tabRows=new Array();this._resizeCheckHandle=null;this._isRendered=false;this.EnableResizing=enableResizing;this._originalWindowOnUnload=null;if(window.onunload)
this._originalWindowOnUnload=window.onunload;window.onunload=new Function(this._variableName+'._windowOnUnload();');this.ParseTabs(tabs,this._getStateValue('selected'));if(this._tabs.length>0)
this.Refresh();}
Telligent_TabSet.prototype._setStateValue=function(key,value)
{if(!this._state)
return;var newValue='';var values=this._state.value.split(/\?/);var found=false;for(var i=0;i<values.length;i++)
{if(newValue!='')
newValue+='?';var keyValue=values[i].split(/\:/,2);if(keyValue.length==2&&keyValue[0]==key)
{newValue+=key+':'+value;found=true;}
else
newValue+=values[i];}
if(!found)
{if(newValue!='')
newValue+='?';newValue+=key+':'+value;}
this._state.value=newValue;}
Telligent_TabSet.prototype._getStateValue=function(key)
{if(this._state&&this._state.value)
{var values=this._state.value.split(/\?/);for(var i=0;i<values.length;i++)
{var keyValue=values[i].split(/\:/,2);if(keyValue.length==2&&keyValue[0]==key)
return keyValue[1];}}
return'';}
Telligent_TabSet.prototype._windowOnUnload=function()
{this.Dispose();if(this._originalWindowOnUnload)
this._originalWindowOnUnload();}
Telligent_TabSet.prototype.Dispose=function()
{this._disposeNodes();this._container=null;this._state=null;}
Telligent_TabSet.prototype._disposeNodes=function()
{for(var i=0;i<this._tabRows.length;i++)
{if(this._tabRows[i]&&this._tabRows[i]._element)
{if(this._tabRows[i]._element.childNodes[0]&&this._tabRows[i]._element.childNodes[0].childNodes[0])
{var tr=this._tabRows[i]._element.childNodes[0].childNodes[0];for(var j=0;j<tr.childNodes.length;j++)
{if(tr.childNodes[j]&&tr.childNodes[j]._tab)
{tr.childNodes[j]._tab._element=null;tr.childNodes[j]._tab=null;tr.childNodes[j].onclick=null;tr.childNodes[j].onmouseover=null;tr.childNodes[j].onmouseout=null;}}}
this._tabRows[i]._element=null;}}}
Telligent_TabSet.prototype._setCssClasses=function(element,classes)
{if(typeof(classes)=='object')
{var i=0;while(element&&i<classes.length)
{element.className=classes[i];i++;element=element.childNodes[0];}}
else if(element)
element.className=classes;}
Telligent_TabSet.prototype._tabMouseOver=function(tab)
{if(tab!=this._selectedTab)
this._setCssClasses(tab._element.childNodes[0],this.TabHoverCssClasses);return false;}
Telligent_TabSet.prototype._tabMouseOut=function(tab)
{if(tab!=this._selectedTab)
this._setCssClasses(tab._element.childNodes[0],this.TabCssClasses);return false;}
Telligent_TabSet.prototype._tabClick=function(tab)
{if(tab.ClientScript)
{hadHandler=true;if((tab.ClientScript(this,tab))==false)
return false;}
if(tab!=this._selectedTab)
{if(this._selectedTab)
this._setCssClasses(this._selectedTab._element.childNodes[0],this.TabCssClasses);this._selectedTab=tab;this._setCssClasses(tab._element.childNodes[0],this.TabSelectedCssClasses);if(this._tabRows.length>1)
{var found;this._selectedTabRow=null;for(var i=0;i<this._tabRows.length;i++)
{found=false;for(var j=0;j<this._tabRows[i]._tabs.length;j++)
{if(this._tabRows[i]._tabs[j]==this._selectedTab)
{this._selectedTabRow=this._tabRows[i];break;}}
if(this._selectedTabRow)
break;}
if(this._selectedTabRow)
{this._container.childNodes[0].removeChild(this._selectedTabRow._element);this._container.childNodes[0].appendChild(this._selectedTabRow._element);}}
else
this._selectedTabRow=this._tabRows[0];this._setStateValue('selected',this._selectedTab.ID);}
if(tab.NavigateUrl)
window.location=tab.NavigateUrl;return false;}
Telligent_TabSet.prototype.Refresh=function()
{this._isRendered=false;this._disposeNodes();hiddenContainer=document.createElement('div');hiddenContainer.style.visibility='hidden';hiddenContainer.style.position='absolute';this._container.appendChild(hiddenContainer);while(hiddenContainer.childNodes.length>0)
hiddenContainer.removeChild(hiddenContainer.childNodes[0]);var table=document.createElement('table');table.cellPadding='0';table.border='0';table.cellSpacing='0';table.appendChild(document.createElement('tbody'));table.childNodes[0].appendChild(document.createElement('tr'));hiddenContainer.appendChild(table);var elementDepth=1;if(typeof(this.TabHoverCssClasses)=="object"&&this.TabHoverCssClasses.length>elementDepth)
elementDepth=this.TabHoverCssClasses.length;if(typeof(this.TabSelectedCssClasses)=="object"&&this.TabSelectedCssClasses.length>elementDepth)
elementDepth=this.TabSelectedCssClasses.length;if(typeof(this.TabCssClasses)=="object"&&this.TabCssClasses.length>elementDepth)
elementDepth=this.TabCssClasses.length;var totalWidth=0;var maxWidth=0;for(var i=0;i<this._tabs.length;i++)
{var cell=document.createElement('td');var element=cell;for(var j=0;j<elementDepth;j++)
{element.appendChild(document.createElement('div'));element=element.childNodes[0];}
element.innerHTML=this._tabs[i].Text;table.childNodes[0].childNodes[0].appendChild(cell);cell._tab=this._tabs[i];this._tabs[i]._element=cell;this._setCssClasses(cell.childNodes[0],this.TabHoverCssClasses);cell._tab._maxWidth=cell.offsetWidth;this._setCssClasses(cell.childNodes[0],this.TabSelectedCssClasses);if(cell._tab._maxWidth<cell.offsetWidth)
cell._tab._maxWidth=cell.offsetWidth;this._setCssClasses(cell.childNodes[0],this.TabCssClasses);if(cell._tab._maxWidth<cell.offsetWidth)
cell._tab._maxWidth=cell.offsetWidth;totalWidth+=cell._tab._maxWidth;if(cell._tab._maxWidth>maxWidth)
maxWidth=cell._tab._maxWidth;}
var numRows=Math.ceil((((totalWidth*3)/this._container.offsetWidth)+((maxWidth*this._tabs.length)/this._container.offsetWidth))/4);var maxTabsPerRow=Math.ceil(this._tabs.length/numRows);if(maxTabsPerRow<1)
maxTabsPerRow=1;while(this._container.childNodes.length>0)
this._container.removeChild(this._container.childNodes[0]);this._container.className=this.CssClass;var container=document.createElement('div');if(this.EnableResizing)
{container.style.width='100%';container.style.overflow='hidden';}
this._container.appendChild(container);this._tabRows=new Array();var selectedTab=this._selectedTab;this._selectedTabRow=null;this._selectedTab=null;var j=-1;for(var i=0;i<this._tabs.length;i++)
{if(j==-1||(this.EnableResizing&&(this._tabRows[j]._tabs.length==maxTabsPerRow||(this._tabRows[j]._element.offsetWidth+this._tabs[i]._maxWidth>container.offsetWidth&&this._tabRows[j]._tabs.length>0))))
{var table=document.createElement('table');table.cellPadding='0';table.border='0';table.cellSpacing='0';table.appendChild(document.createElement('tbody'));table.childNodes[0].appendChild(document.createElement('tr'));container.appendChild(table);j++;this._tabRows[j]=new Telligent_TabSetRow(table);}
this._tabRows[j]._element.childNodes[0].childNodes[0].appendChild(this._tabs[i]._element);this._tabRows[j]._tabs[this._tabRows[j]._tabs.length]=this._tabs[i];this._tabs[i]._tabRow=this._tabRows[j];this._tabs[i]._element.onclick=new Function('return '+this._variableName+'._tabClick(this._tab, '+j+');');this._tabs[i]._element.onmouseover=new Function('return '+this._variableName+'._tabMouseOver(this._tab, '+j+');');;this._tabs[i]._element.onmouseout=new Function('return '+this._variableName+'._tabMouseOut(this._tab, '+j+');');;if(this._tabs[i]==selectedTab)
{this._selectedTab=this._tabs[i];this._selectedTabRow=this._tabRows[j];this._setCssClasses(this._tabs[i]._element.childNodes[0],this.TabSelectedCssClasses);}}
if(this._tabRows.length>1)
{for(var i=0;i<this._tabRows.length;i++)
{this._tabRows[i]._element.style.width='100%';}
if(this._selectedTabRow)
{container.removeChild(this._selectedTabRow._element);container.appendChild(this._selectedTabRow._element);}}
if(this._selectedTab)
this._setStateValue('selected',this._selectedTab.ID);else
this._setStateValue('selected','');this._isRendered=true;if(this._tabs.length>0)
{if(this._resizeCheckHandle)
window.clearTimeout(this._resizeCheckHandle);this._resizeCheckHandle=window.setTimeout(new Function(this._variableName+'._resizeCheck();'),49);}}
Telligent_TabSet.prototype.ParseTabs=function(tabs,selectedTabId)
{if(typeof(selectedTabId)=='undefined'&&this._selectedTab)
selectedTabId=this._selectedTab.ID;this._tabs=new Array();if(!tabs||tabs.length==0)
return;for(var i=0;i<tabs.length;i++)
{this._tabs[i]=new Telligent_TabSetTab(tabs[i][0],tabs[i][1]);this._tabs[i].NavigateUrl=tabs[i][2];this._tabs[i].ClientScript=tabs[i][3];this._tabs[i]._tabSet=this;if(this._tabs[i].ID==selectedTabId)
this._selectedTab=this._tabs[i];}}
Telligent_TabSet.prototype._resizeCheck=function()
{if(this._resizeCheckHandle)
window.clearTimeout(this._resizeCheckHandle);if(this.EnableResizing&&this._isRendered&&this._container.offsetWidth!=this._previousContainerOffsetWidth)
{this.Refresh();this._previousContainerOffsetWidth=this._container.offsetWidth;if(this.OnTabSetResizeFunction)
this.OnTabSetResizeFunction(this);}
this._resizeCheckHandle=window.setTimeout(new Function(this._variableName+'._resizeCheck();'),999);}
Telligent_TabSet.prototype.AddTab=function(tab)
{this.RemoveTab(tab);if(tab)
{tab._tabSet=this;this._tabs[this._tabs.length]=tab;}}
Telligent_TabSet.prototype.RemoveTab=function(tab)
{var tabs=new Array();var found=false;for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i]==tab)
found=true;else
tabs[tabs.length]=this._tabs[i];}
if(found)
this._tabs=tabs;}
Telligent_TabSet.prototype.ClearTabs=function()
{this._tabs=new Array();}
Telligent_TabSet.prototype.InsertTab=function(tab,index)
{this.RemoveTab(tab);var tabs=new Array();var inserted=false;for(var i=0;i<this._tabs.length;i++)
{if(i==index)
{inserted=true;tab._tabSet=this;tabs[tabs.length]=tab;}
tabs[tabs.length]=this._tabs[i];}
if(!inserted)
tabs[tabs.length]=tab;this._tabs=tabs;}
Telligent_TabSet.prototype.GetTabById=function(id)
{for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i].ID==id)
return this._tabs[i];}
return null;}
Telligent_TabSet.prototype.GetTabsByText=function(text)
{var tabs=new Array();for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i].Text==text)
tabs[tabs.length]=this._tabs[i];}
return tabs;}
Telligent_TabSet.prototype.GetTabAtIndex=function(index)
{if(index>=0&&index<this._tabs.length)
return this._tabs[index];else
return null;}
Telligent_TabSet.prototype.GetTabCount=function()
{return this._tabs.length;}
Telligent_TabSet.prototype.SelectTab=function(tab)
{if(tab&&tab._tabSet==this)
this._tabClick(tab);}
Telligent_TabSet.prototype.GetSelectedTab=function()
{return this._selectedTab;}
function Telligent_TabSetTab(id,text)
{this.ID=id;this.Text=text;this.NavigateUrl=null;this.ClientScript=null;this._maxWidth=0;this._element=null;this._tabSet=null;this._tabSetRow=null;}
Telligent_TabSetTab.prototype.GetTabSet=function()
{return this._tabSet;}
function Telligent_TabSetRow(element)
{this._element=element;this._tabs=new Array();this._tabSet=null;}