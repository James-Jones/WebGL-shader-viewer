
CurrentMeshDesc =
{
    indexcount : 0,
    minx : 0,
    miny : 0,
    minz : 0,
    maxx : 0,
    maxy : 0,
    maxz : 0,
    midx : 0,
    midy : 0,
    midz : 0
}
// var idxcount = 0

function handleLoadedMesh(mesh) {
    // userData.vertPosObject = gl.createBuffer();
    //gl.bindBuffer ( gl.ARRAY_BUFFER, userData.vertPosObject );
    gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(mesh.vtxpos), gl.STATIC_DRAW );
    // userData.indicesObject = gl.createBuffer();
    //gl.bindBuffer ( gl.ELEMENT_ARRAY_BUFFER, userData.indicesObject );
    gl.bufferData ( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.idx), gl.STATIC_DRAW );
    
    CurrentMeshDesc.indexcount = mesh.idx.length
    
    box = new Float32Array(mesh.bndbox)
    CurrentMeshDesc.minx = box[0]
    CurrentMeshDesc.miny = box[1]
    CurrentMeshDesc.minz = box[2]
    CurrentMeshDesc.maxx = box[3]
    CurrentMeshDesc.maxy = box[4]
    CurrentMeshDesc.maxz = box[5]
    CurrentMeshDesc.midx = (box[0] + box[3]) * 0.5
    CurrentMeshDesc.midy = (box[1] + box[4]) * 0.5
    CurrentMeshDesc.midz = (box[2] + box[5]) * 0.5
}

function loadMesh() {
    var request = new XMLHttpRequest();
    request.open("GET", "bin\\sphere.json");
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            handleLoadedMesh(JSON.parse(request.responseText));
        }
    }
    request.send();
}

