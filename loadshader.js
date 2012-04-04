     
        var currentPS =
            'precision mediump float;                            \n\
            void main()                                         \n\
            {                                                   \n\
            gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );        \n\
            }                                                   \n';
        var reloadPS = false;
        
        var currentVS = 
            'uniform mat4 u_mvpMatrix;                   \n\
            attribute vec4 a_position;                  \n\
            void main()                                 \n\
            {                                           \n\
            gl_Position = u_mvpMatrix * a_position;  \n\
            }                                           \n';
        var reloadVS = false;

        function loadcompletePS(e)
        {
            var span = document.createElement('span');
            span.innerHTML = ['<p style="width:500px;border:2px solid#00F">', e.target.result, '</p>'].join('');
            document.getElementById('list').insertBefore(span, null);
            currentPS =  e.target.result;
            reloadPS = true;
        }

        function handleFileSelectPS(evt)
        {
            var files = evt.target.files; //FileList object

            //File is a FileList of File objects. List some Properties
            for(var i =0, f; f = files[i]; i++)
            {
                var reader = new FileReader();
                reader.onload = loadcompletePS;
                reader.readAsText(f);
            }
        }

        function handleFileDropPS(evt)
        {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; //FileList object

            //File is a FileList of File objects. List some Properties
            for(var i =0, f; f = files[i]; i++)
            {
                var reader = new FileReader();
                reader.onload = loadcompletePS;
                reader.readAsText(f);
            }
        }

        function loadcompleteVS(e)
        {
            //var span = document.createElement('span');
            //span.innerHTML = ['<p style="width:500px;border:2px solid#00F">', e.target.result, '</p>'].join('');
            //document.getElementById('list').insertBefore(span, null);
            currentVS =  e.target.result;
            reloadVS = true;
        }

        function handleFileSelectVS(evt)
        {
            var files = evt.target.files; //FileList object

            //File is a FileList of File objects. List some Properties
            for(var i =0, f; f = files[i]; i++)
            {
                var reader = new FileReader();
                reader.onload = loadcompleteVS;
                reader.readAsText(f);
            }
        }

        function handleFileDropVS(evt)
        {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; //FileList object

            //File is a FileList of File objects. List some Properties
            for(var i =0, f; f = files[i]; i++)
            {
                var reader = new FileReader();
                reader.onload = loadcompleteVS;
                reader.readAsText(f);
            }
        }

        function handleDragOver(evt)
        {
            evt.stopPropagation();
            evt.preventDefault();
        }
        
        
        document.getElementById('ps_files').addEventListener('change', handleFileSelectPS, false);
        var ps_dropZone = document.getElementById('ps_drop_zone');
        ps_dropZone.addEventListener('dragover', handleDragOver, false);
        ps_dropZone.addEventListener('drop', handleFileDropPS, false);

        document.getElementById('vs_files').addEventListener('change', handleFileSelectVS, false);
        var vs_dropZone = document.getElementById('vs_drop_zone');
        vs_dropZone.addEventListener('dragover', handleDragOver, false);
        vs_dropZone.addEventListener('drop', handleFileDropVS, false);
