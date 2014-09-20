
function Telligent_TabbedPanes(varName,containerId,tabSetContainerId,stateId,cssClass,tabSetCssClass,tabCssClasses,tabSelectedCssClasses,tabHoverCssClasses,onResizeFunction,enableResizing,tabs)
{this._variableName=varName;this._container=document.getElementById(containerId);this.CssClass=cssClass;this.OnResizeFunction=onResizeFunction;this.TabSetCssClass=tabSetCssClass;this.TabCssClasses=tabCssClasses;this.TabSelectedCssClasses=tabSelectedCssClasses;this.TabHoverCssClasses=tabHoverCssClasses;this._tabset=new Telligent_TabSet('window.'+this._variableName+'._tabset',tabSetContainerId,stateId,tabSetCssClass,tabCssClasses,tabSelectedCssClasses,tabHoverCssClasses,null,onResizeFunction,enableResizing,new Array());this._tabs=new Array();this._isRendered=false;this._selectedTab=null;this.EnableResizing=enableResizing;this._parseTabs(tabs,this._tabset._getStateValue('selected'));this.Refresh();}
Telligent_TabbedPanes.prototype.Dispose=function()
{this._tabset.Dispose();this._container=null;}
Telligent_TabbedPanes.prototype._tabClick=function(tab)
{if(tab.ClientScript)
{hadHandler=true;if((tab.ClientScript(this,tab))==false)
return false;}
if(tab!=this._selectedTab)
{if(this._selectedTab&&this._selectedTab._tabPane)
this._selectedTab._tabPane.style.display='none';if(tab._tabPane)
tab._tabPane.style.display='block';this._selectedTab=tab;}}
Telligent_TabbedPanes.prototype.Refresh=function()
{this._isRendered=false;var selectedTab=this._selectedTab;this._selectedTab=null;if(this.EnableResizing)
{this._container.childNodes[0].style.width='100%';this._container.childNodes[0].style.height='100%';this._container.childNodes[0].style.overflow='auto';}
else
{this._container.childNodes[0].style.width='auto';this._container.childNodes[0].style.height='auto';this._container.childNodes[0].style.overflow='visible';}
this._container.className=this.CssClass;this._tabset.ClearTabs();var disabledTabList='';for(var i=0;i<this._tabs.length;i++)
{if(!this._tabs[i]._tabsetTab)
{var tab=new Telligent_TabSetTab(this._tabs[i].ID,this._tabs[i].Text);tab.ClientScript=new Function('tabset','tab','window.'+this._variableName+'._tabClick(tab._tabbedPanesTab);');this._tabs[i]._tabsetTab=tab;tab._tabbedPanesTab=this._tabs[i];}
if(!this._tabs[i]._tabPane)
{var pane=document.createElement('div');this._container.childNodes[0].appendChild(pane);this._tabs[i]._tabPane=pane;}
if(!this._tabs[i].Disabled)
{this._tabset.AddTab(this._tabs[i]._tabsetTab);if(this._tabs[i]==selectedTab)
{this._selectedTab=this._tabs[i];this._tabset._selectedTab=this._tabs[i]._tabsetTab;this._selectedTab._tabPane.style.display='block';}
else
this._tabs[i]._tabPane.style.display='none';}
else
{if(disabledTabList!='')
disabledTabList+=',';disabledTabList+=this._tabs[i].ID;this._tabs[i]._tabPane.style.display='none';}}
this._tabset._setStateValue('disabled',disabledTabList);if(this._selectedTab==null&&this._tabset.GetTabCount()>0)
{this._selectedTab=this._tabset.GetTabAtIndex(0)._tabbedPanesTab;this._tabset._selectedTab=this._tabset.GetTabAtIndex(0);this._selectedTab._tabPane.style.display='block';}
this._tabset.OnTabSetResizeFunction=this.OnResizeFunction;this._tabset.EnableResizing=this.EnableResizing;this._tabset.CssClass=this.TabSetCssClass;this._tabset.TabCssClasses=this.TabCssClasses;this._tabset.TabSelectedCssClasses=this.TabSelectedCssClasses;this._tabset.TabHoverCssClasses=this.TabHoverCssClasses;this._tabset.Refresh();this._isRendered=true;}
Telligent_TabbedPanes.prototype._parseTabs=function(tabs,selectedTabId)
{this._tabs=new Array();this._tabset.Tabs=new Array();if(!tabs||tabs.length==0)
return;var disabledTabs=new Object();var disabledTabList=this._tabset._getStateValue('disabled').split(/\,/);var i;for(i=0;i<disabledTabList.length;i++)
{disabledTabs[disabledTabList[i]]=true;}
for(i=0;i<tabs.length;i++)
{this._tabs[i]=new Telligent_TabbedPaneTab(tabs[i][0],tabs[i][1]);this._tabs[i].ClientScript=tabs[i][2];if(disabledTabs[tabs[i][0]])
this._tabs[i].Disabled=true;this._tabs[i]._tabPane=document.getElementById(tabs[i][3]);this._tabs[i]._tabbedPanes=this;if(this._tabs[i].ID==selectedTabId)
this._selectedTab=this._tabs[i];}}
Telligent_TabbedPanes.prototype.AddTab=function(tab)
{this.RemoveTab(tab,true);if(tab)
{tab._tabbedPanes=this;if(!tab._tabPane)
{var pane=document.createElement('div');this._container.childNodes[0].appendChild(pane);tab._tabPane=pane;}
this._tabs[this._tabs.length]=tab;}}
Telligent_TabbedPanes.prototype.RemoveTab=function(tab,preserveContent)
{var tabs=new Array();var found=false;for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i]==tab)
{if(this._tabs[i]._tabPane&&!preserveContent)
{this._container.childNodes[0].removeChild(this._tabs[i]._tabPane);this._tabs[i]._tabPane=null;}
found=true;}
else
tabs[tabs.length]=this._tabs[i];}
if(found)
this._tabs=tabs;}
Telligent_TabbedPanes.prototype.ClearTabs=function()
{for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i]._tabPane)
{this._container.childNodes[0].removeChild(this._tabs[i]._tabPane);this._tabs[i]._tabPane=null;}}
this._tabs=new Array();}
Telligent_TabbedPanes.prototype.InsertTab=function(tab,index)
{this.RemoveTab(tab,true);var tabs=new Array();var inserted=false;for(var i=0;i<this._tabs.length;i++)
{if(i==index)
{inserted=true;tab._tabbedPanes=this;if(!tab._tabPane)
{var pane=document.createElement('div');this._container.childNodes[0].appendChild(pane);tab._tabPane=pane;}
tabs[tabs.length]=tab;}
tabs[tabs.length]=this._tabs[i];}
if(!inserted)
tabs[tabs.length]=tab;this._tabs=tabs;}
Telligent_TabbedPanes.prototype.GetTabById=function(id)
{for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i].ID==id)
return this._tabs[i];}
return null;}
Telligent_TabbedPanes.prototype.GetTabsByText=function(text)
{var tabs=new Array();for(var i=0;i<this._tabs.length;i++)
{if(this._tabs[i].Text==text)
tabs[tabs.length]=this._tabs[i];}
return tabs;}
Telligent_TabbedPanes.prototype.GetTabAtIndex=function(index)
{if(index>=0&&index<this._tabs.length)
return this._tabs[index];else
return null;}
Telligent_TabbedPanes.prototype.GetTabCount=function()
{return this._tabs.length;}
Telligent_TabbedPanes.prototype.SelectTab=function(tab)
{if(tab&&tab._tabbedPanes==this&&tab._tabsetTab)
this._tabset.SelectTab(tab._tabsetTab);}
Telligent_TabbedPanes.prototype.GetSelectedTab=function()
{return this._selectedTab;}
function Telligent_TabbedPaneTab(id,text)
{this.ID=id;this.Text=text;this.ClientScript=null;this.Disabled=false;this._tabPane=null;this._tabsetTab=null;this._tabbedPanes=null;}
Telligent_TabbedPaneTab.prototype.GetTabbedPanes=function()
{return this._tabbedPanes;}
Telligent_TabbedPaneTab.prototype.ClearPaneContent=function()
{while(this._tabPane.childNodes.length>0)
this._tabPane.removeChild(this._tabPane.childNodes[0]);}
Telligent_TabbedPaneTab.prototype.SetPaneContent=function(html)
{this.ClearPaneContent();this._tabPane.innerHTML=html;}
Telligent_TabbedPaneTab.prototype.AddNodeToPane=function(node)
{this._tabPane.appendChild(node);}
Telligent_TabbedPaneTab.prototype.RemoveNodeFromPane=function(node)
{this._tabPane.removeChild(node);}
Telligent_TabbedPaneTab.prototype.GetPaneNodes=function()
{return this._tabPane.childNodes;}