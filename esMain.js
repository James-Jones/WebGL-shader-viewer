            UserData = function()
            {
            // Handle to a program object
            this.programObject = 0;

            // Attribute locations
            this.positionLoc = 0;

            // Uniform locations
            this.mvpLoc = 0;

            // Vertex data
            this.vertPosObject = 0;
            this.indicesObject = 0;
            this.numIndices = 0;

            // Rotation angle
            this.angle = 0.0;

            // MVP matrix
            this.mvpMatrix = new ESMatrix();

            }

            ///
            // Initialize the shader and program object
            //
            function Init ( esContext )
            {
            var userData = esContext.userData;
            var vShaderStr =
            'uniform mat4 u_mvpMatrix;                   \n\
            attribute vec4 a_position;                  \n\
            void main()                                 \n\
            {                                           \n\
            gl_Position = u_mvpMatrix * a_position;  \n\
            }                                           \n';

            var fShaderStr =
            'precision mediump float;                            \n\
            void main()                                         \n\
            {                                                   \n\
            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );        \n\
            }                                                   \n';

            // Load the shaders and get a linked program object
            userData.programObject = esLoadProgram ( vShaderStr, fShaderStr );

            // Get the attribute locations
            userData.positionLoc = gl.getAttribLocation ( userData.programObject, "a_position" );

            // Get the uniform locations
            userData.mvpLoc = gl.getUniformLocation( userData.programObject, "u_mvpMatrix" );

            // Generate the vertex data
            var shape = esGenCube( 1.0, true, false, false, true );
            userData.numIndices = shape.numIndices;


            // Starting rotation angle for the cube
            userData.angle = 45.0;

            // Generate the VBOs
            userData.vertPosObject = gl.createBuffer();
            gl.bindBuffer ( gl.ARRAY_BUFFER, userData.vertPosObject );
            gl.bufferData ( gl.ARRAY_BUFFER, shape.vertices, gl.STATIC_DRAW );
            userData.indicesObject = gl.createBuffer();
            gl.bindBuffer ( gl.ELEMENT_ARRAY_BUFFER, userData.indicesObject );
            gl.bufferData ( gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.STATIC_DRAW );
            
            // loadMesh();
            
            CurrentMeshDesc.indexcount = shape.numIndices;

            gl.clearColor ( 0.0, 0.0, 0.0, 1.0 );
            gl.disable(gl.BLEND);
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);
            return true;
            }
            
            function max(a, b)
            {
                if(a > b)
                {
                    return a;
                }
                return b;
            }


            ///
            // Update MVP matrix based on time
            //
            function Update ( esContext, deltaTime )
            {
            var userData = esContext.userData;
            var perspective = new ESMatrix();
            var modelview = new ESMatrix();
            var aspect;

            if(reloadPS || reloadVS)
            {
                reloadPS = false;
                reloadVS = false;

                // Load the shaders and get a linked program object
                userData.programObject = esLoadProgram ( currentVS, currentPS );

                // Get the attribute locations
                userData.positionLoc = gl.getAttribLocation ( userData.programObject, "a_position" );

                // Get the uniform locations
                userData.mvpLoc = gl.getUniformLocation( userData.programObject, "u_mvpMatrix" );
            }

            // Compute a rotation angle based on time to rotate the cube
            userData.angle += ( deltaTime / 25.0 );
            if( userData.angle >= 360.0 )
            userData.angle -= 360.0;

            // Compute the window aspect ratio
            aspect = esContext.width / esContext.height;

            // Generate a perspective matrix with a 60 degree FOV
            esMatrixLoadIdentity( perspective );
            esPerspective( perspective, 60.0, aspect, 1.0, 20.0 );

            // Generate a model view matrix to rotate/translate the cube
            esMatrixLoadIdentity( modelview );

            // Translate away from the viewer
            //esTranslate( modelview, 0.0, 0.0, -2.0 );
           
    // scale the whole asset to fit into our view frustum 
    scale = CurrentMeshDesc.maxx-CurrentMeshDesc.minx;
    scale = max(CurrentMeshDesc.maxy - CurrentMeshDesc.miny,scale);
    scale = max(CurrentMeshDesc.maxz - CurrentMeshDesc.minz,scale);
    scale = 1.0 / scale;
//    esScale(modelview, scale, scale, scale);

        // center the model
    esTranslate(modelview, -CurrentMeshDesc.midx, -CurrentMeshDesc.midy, -CurrentMeshDesc.midz );

            // Rotate the cube
            //esRotate( modelview, userData.angle, 1.0, 0.0, 1.0 );

            // Compute the final MVP by multiplying the
            // modevleiw and perspective matrices together
            esMatrixMultiply( userData.mvpMatrix, modelview, perspective );
            }

            ///
            // Draw a triangle using the shader pair created in Init()
            //
            function Draw ( esContext )
            {
            var userData = esContext.userData;

            // Set the viewport
            gl.viewport ( 0, 0, esContext.width, esContext.height );

            // Clear the color buffer
            gl.clear ( gl.COLOR_BUFFER_BIT );

            // Use the program object
            gl.useProgram ( userData.programObject );

            // Load the vertex position
            gl.bindBuffer ( gl.ARRAY_BUFFER, userData.vertPosObject );
            gl.vertexAttribPointer ( userData.positionLoc, 3, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray ( userData.positionLoc );

            // Load the index buffer
            gl.bindBuffer ( gl.ELEMENT_ARRAY_BUFFER, userData.indicesObject );

            // Load the MVP matrix
            gl.uniformMatrix4fv( userData.mvpLoc, false, getAsFloat32Array(userData.mvpMatrix) );

            // Draw the cube
            //gl.drawElements ( gl.TRIANGLES, userData.numIndices, gl.UNSIGNED_SHORT, 0 );

            gl.drawElements ( gl.TRIANGLES, CurrentMeshDesc.indexcount, gl.UNSIGNED_SHORT, 0 );
            }

            function main ()
            {
            var canvas = document.getElementById("webgl-canvas");
            var esContext = new ESContext();
            var userData = new UserData();

            esInitContext ( esContext, canvas );
            esContext.userData = userData;

            if ( !Init ( esContext ) )
            return 0;

            esRegisterDrawFunc ( esContext, Draw );
            esRegisterUpdateFunc ( esContext, Update );

            esMainLoop ( esContext );
            }