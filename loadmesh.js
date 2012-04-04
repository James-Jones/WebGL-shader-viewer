
function loadcompleteMesh(e)
{
    handleLoadedMesh(JSON.parse(e.target.result));
}

function handleFileSelectMesh(evt)
{
    var files = evt.target.files; //FileList object

    //File is a FileList of File objects. List some Properties
    for(var i =0, f; f = files[i]; i++)
    {
        var reader = new FileReader();
        reader.onload = loadcompleteMesh;
        reader.readAsText(f);
    }
}

document.getElementById('mesh_files').addEventListener('change', handleFileSelectMesh, false);
