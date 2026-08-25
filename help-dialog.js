"use strict";
(()=>{
  const dialog=document.getElementById("basicHelpDialog");
  const openButton=document.getElementById("basicHelpOpen");
  const closeButton=document.getElementById("basicHelpClose");
  if(!dialog||!openButton||!closeButton)return;

  const openDialog=()=>{
    if(typeof dialog.showModal==="function")dialog.showModal();
    else{dialog.setAttribute("open","");document.body.classList.add("helpDialogFallbackOpen");}
    dialog.querySelector(".basicHelpContent")?.scrollTo({top:0,behavior:"auto"});
  };
  const closeDialog=()=>{
    if(typeof dialog.close==="function"&&dialog.open)dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("helpDialogFallbackOpen");
    openButton.focus();
  };

  openButton.addEventListener("click",openDialog);
  closeButton.addEventListener("click",closeDialog);
  dialog.addEventListener("cancel",event=>{event.preventDefault();closeDialog();});
  dialog.addEventListener("click",event=>{
    if(event.target!==dialog)return;
    const box=dialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeDialog();
  });
})();
