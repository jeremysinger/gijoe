myCodeMirror.on("keyup", (cm, event) => {
    let autoCompleteSetting = JSON.parse(tutorialSettings).autoComplete;
    /*
    Get the keys which are excluded from the auto complete functions
    these are:
    8   - Backspace
    9   - Tab
    13  - Enter
    48  - )
    57  - (
    186 - ; 
    219 - {
    221 - }

    This will hopefully fix the annoying part of the auto complete function
    */
    const excludedKeys = [8, 9, 13, 48, 57, 186, 219, 221];
    if (!cm.state.completionActive && autoCompleteSetting && !excludedKeys.includes(event.keyCode)) {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
})