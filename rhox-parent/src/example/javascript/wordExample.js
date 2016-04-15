load(java.lang.System.getProperty('user.home') + '/rhox/bootstrap.js');


try {
    var combridge = require('rhox-combridge');
} catch (e) {
    e.cause.printStackTrace();
}

var ComObject = combridge.ComObject;


var System = Java.type('java.lang.System')
var Runtime = Java.type('java.lang.Runtime')


var dir = System.getProperty("user.home");
var inputDoc = dir + "\\file_in.docx";
var outputDoc = dir + "\\file_out.docx";
var oldText = "[label:import:1]";
var newText = "I am some horribly long sentence, so long that [insert bullshit here]";
var visible = true;
var saveOnExit = false;

var win = "file_in.docx - Word";

// Code
var au = new ComObject('AutoItX3.Control');

var word = new ComObject('Word.Application');
try {
    word.Visible = true;
    var documents = word.Documents;
    var document = documents.Open(inputDoc);

    au.WinActivate(win);
    au.WinWaitActive(win);
    au.Send('Der hier kommt von der Tastatur');

    var selection = word.Selection;
    var find = selection.Find;

    find.Text = oldText;
    find.Execute();

    selection.Text = newText;

    var wordBasic = word.WordBasic;
    wordBasic.FileSaveAs(outputDoc);

} finally {
    word.Quit();
}