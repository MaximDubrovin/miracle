
/* Console blocker for unsupported browsers */
if (typeof(console) == 'undefined') {
    console = {log: function(){}};
}