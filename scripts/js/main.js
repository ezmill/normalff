    var container;
var scene, camera, light, renderer;
var renderSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
//wtf
// var renderSize = new THREE.Vector2(2448/2,3264/2);
// var renderSize = new THREE.Vector2(1200,846);
// var renderSize = new THREE.Vector2((2448/3)*window.innerHeight/(3264/3),window.innerHeight);
var mouse = new THREE.Vector2(0.0,0.0);
var mouseDown = false;
// var r2 = 1.0;
var r2 = 10.0;
var time = 0.0;
var capturer = new CCapture( { framerate: 60, format: 'webm', workersPath: 'js/' } );

init();
animate();

function init(){
    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera( renderSize.x / - 2, renderSize.x / 2, renderSize.y / 2, renderSize.y / - 2, -10000, 10000 );
    // camera = new THREE.PerspectiveCamera(45, renderSize.x/renderSize.y, 0.1,10000);
    camera.position.z = -1000;
    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
    renderer.setSize( renderSize.x, renderSize.y );
    renderer.setClearColor(0xffffff,1.0);

    container = document.getElementById( 'container' );
    // container.appendChild(renderer.domElement);

    // video = document.createElement( 'video' );
    // video.muted = true;
    // navigator.getUserMedia  = navigator.getUserMedia ||
              // navigator.webkitGetUserMedia ||
              // navigator.mozGetUserMedia ||
              // navigator.msGetUserMedia;

    // navigator.getUserMedia({audio:false, video:true}, function(stream){
        // video.src = window.URL.createObjectURL(stream);
        // video.play();
    // }, function(err){
        // console.log(err);
    // });
    // _texture = new THREE.Texture( video );
    _texture = null;
    // _texture.needsUpdate = true;
    // _texture = THREE.ImageUtils.loadTexture("assets/textures/IMG_2584.jpg");
    // _texture = new THREE.Texture(gradient.canvas);
    // texture = THREE.ImageUtils.loadTexture("assets/textures/IMG_4215.JPG");
    // _texture.minFilter = _texture.magFilter = THREE.NearestFilter;
    // _scene = new THREE.Scene();
    // _camera = new THREE.OrthographicCamera( renderSize.x / - 2, renderSize.x / 2, renderSize.y / 2, renderSize.y / - 2, -10000, 10000 );
    // _camera.position.z = 1;
    // _renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
    // _renderer.setSize( renderSize.x, renderSize.y );
    // _renderer.setClearColor(0xffffff,1.0);
    // _customShaders = new CustomShaders();
    // _geo = new THREE.PlaneGeometry(renderSize.x, renderSize.y);
    // _geo = new THREE.SphereGeometry(500,250,250);
    // _mat = new THREE.ShaderMaterial({
        // uniforms: _customShaders.gridShader.uniforms,
        // fragmentShader: _customShaders.gridShader.fragmentShader,
        // vertexShader: _customShaders.gridShader.vertexShader
    // });
    // _mat.uniforms.texture.value = null;
    // _mat.uniforms.grid.value = 1.0;
    // _mesh = new THREE.Mesh(_geo , _mat);
    // scene.add(_mesh);
    // container.appendChild(_renderer.domElement);

    texture = null;
    // texture = new THREE.Texture(_renderer.domElement);
    // texture = THREE.ImageUtils.loadTexture("assets/textures/input.png");
    // texture.minFilter = texture.magFilter = THREE.LinearFilter;
    // texture.needsUpdate = true;

    // shader = new MeshShader();
    // material = new THREE.ShaderMaterial({
        // uniforms: shader.uniforms,
        // vertexShader: shader.vertexShader,
        // fragmentShader: shader.fragmentShader,
        // side: 2,
        // transparent: true
    // });
    // material.uniforms["texture"].value = texture;
    // material.uniforms["resolution"].value = renderSize;
    // material.uniforms["r2"].value = r2;
    // material.uniforms["time"].value = time;
    // geometry = new THREE.PlaneGeometry(renderSize.x, renderSize.y);
    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    var customShaders = new CustomShaders();
    var customShaders2 = new CustomShaders();
    shaders = [ 
        // customShaders.gridShader,
        // paintFlow,
        // customShaders2.gridShader,
        customShaders2.reposShader,
        customShaders2.blurShader,
        customShaders.diffShader, 
        customShaders2.reposShader,
        customShaders.blurShader,
        // customShaders.passShader
        new NormalShader(),
        customShaders.gridShader
        // customShaders.embossShader
    ];
    fbMaterial = new FeedbackMaterial(renderer, scene, camera, texture, shaders);  
    fbMaterial.init();

    // fbTex = new THREE.Texture(renderer.domElement);
    // fbTex.needsUpdate = true;
    // fbTex.minFilter = fbTex.magFilter = THREE.NearestFilter;


    // normalScene = new THREE.Scene();
    // normalCamera = new THREE.PerspectiveCamera(45, renderSize.x/renderSize.y, 0.1,10000);
    // normalCamera = new THREE.OrthographicCamera( renderSize.x / - 2, renderSize.x / 2, renderSize.y / 2, renderSize.y / - 2, -10000, 10000 );
    // normalCamera.position.z = -1000;
    // controls = new THREE.OrbitControls(normalCamera);
    // normalRenderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
    // normalRenderer.setSize( renderSize.x, renderSize.y );
    // normalRenderer.setClearColor(0xffffff,1.0);

    // ambientLight = new THREE.AmbientLight( 0xffffff );
    // normalScene.add( ambientLight );

    // pointLight = new THREE.PointLight( 0xff0000, 1.0, 1000 );
    // pointLight.position.set( 0, 0, 600 );

    // normalScene.add( pointLight );

    // directionalLight = new THREE.DirectionalLight( 0xffffff );
    // directionalLight.position.set( 1, -0.5, -1 );
    // normalScene.add( directionalLight );

    // normalMaterial = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     // specular: 0x222222,
    //     shininess: 35,
    //     map: fbTex,
    //     // specularMap: THREE.ImageUtils.loadTexture( "obj/leeperrysmith/Map-SPEC.jpg" ),
    //     // bumpMap: fbTex,
    //    normalMap: fbTex,
    //     normalScale: new THREE.Vector2( 1.8, 1.8 )
    // })
    // normalMaterial = new THREE.ShaderMaterial( {
// 
        // uniforms: { 
            // tNormal: {type: 't', value: fbTex },
            // tMatCap: {type: 't', value: THREE.ImageUtils.loadTexture( 'assets/textures/gold.jpg' ) },
            // time: {type: 'f', value: 0 },
            // bump: {type: 'f', value: 0 },
            // noise: {type: 'f', value: .00 },
            // repeat: {type: 'v2', value: new THREE.Vector2( 1, 1 ) },
            // useNormal: {type: 'f', value: 1 },
            // useRim: {type: 'f', value: 0 },
            // rimPower: {type: 'f', value: 2 },
            // useScreen: {type: 'f', value: 0 },
            // normalScale: {type: 'f', value: 0.5 },
            // normalRepeat: {type: 'f', value: 1 }
        // },
        // vertexShader: document.getElementById( 'vertexShader' ).textContent,
        // fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        // wrapping: THREE.ClampToEdgeWrapping,
        // shading: THREE.SmoothShading,
        // side: THREE.DoubleSide
        // 
    // } );
// 
    // normalMaterial.uniforms.tMatCap.value.wrapS = normalMaterial.uniforms.tMatCap.value.wrapT = 
    // THREE.ClampToEdgeWrapping;

    // normalMaterial.uniforms.tNormal.value.wrapS = normalMaterial.uniforms.tNormal.value.wrapT = 
    // THREE.RepeatWrapping;

    // normalGeometry = new THREE.PlaneGeometry(renderSize.x, renderSize.y);
// 
    fbMaterial.material.uniforms["tMatCap"].value = THREE.ImageUtils.loadTexture( 'assets/textures/gold1.jpg' ) 
    fbMaterial.geometry.verticesNeedUpdate = true;
    fbMaterial.geometry.normalsNeedUpdate = true;
    fbMaterial.geometry.uvsNeedUpdate = true;
    fbMaterial.geometry.computeCentroids();
    fbMaterial.geometry.computeFaceNormals();
    fbMaterial.geometry.computeVertexNormals();
    fbMaterial.geometry.computeMorphNormals();
    fbMaterial.geometry.computeTangents();
// 
    // normalMesh = new THREE.Mesh(normalGeometry, normalMaterial);
    // normalMesh.position.set(0,0,0);
    // normalScene.add(normalMesh);

    container.appendChild(renderer.domElement);


    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'touchend', onDocumentTouchEnd, false );
    document.addEventListener( 'touchcancel', onDocumentTouchEnd, false );
    document.addEventListener( 'touchleave', onDocumentTouchEnd, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );

}

function animate(){
    window.requestAnimationFrame(animate);
    draw();
}

function onMouseMove(event){
    mouse.x = ( event.pageX / renderSize.x ) * 2 - 1;
    mouse.y = - ( event.pageY / renderSize.y ) * 2 + 1;
    for(var i = 0; i < fbMaterial.fbos.length; i++){
      // fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(0.01,0.01);
    }
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        gradient.sampleColors();
        r2 = Math.random()*2.0;
        mouse.x = ( event.touches[ 0 ].pageX / renderSize.x ) * 2 - 1;
        mouse.y = - ( event.touches[ 0 ].pageY / renderSize.y ) * 2 + 1;
    }
}

function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouse.x = ( event.touches[ 0 ].pageX / renderSize.x ) * 2 - 1;
        mouse.y = - ( event.touches[ 0 ].pageY / renderSize.y ) * 2 + 1;
    }
}
    
function onDocumentTouchEnd( event ) {
    mouse.x = 0; 
    mouse.y = 0;
}
var counter = 0;
function onMouseDown(){
    mouseDown = true;
    // r2 = 1.0;
    if(counter%2 == 0){
        fbMaterial.inputFbo.materialuniforms.grid.value = 0.0;
    } else {
        fbMaterial.inputFbo.materialuniforms.grid.value = 1.0;
    }
    counter++;

}
function onMouseUp(){
    mouseDown = false;
    // r2 = 0;
}
function draw(){

    time += 0.01;
    // material.uniforms["time"].value = time;
    // if(mouseDown){
        // r2 = 0.005;
    // r2 = Math.random()*3.0;
    // }
    // mouse.x = ( Math.random()) * 2 - 1;
    // mouse.y = - ( Math.random()) * 2 + 1;
    // _texture = texture.clone();
    // _mat.uniforms.texture.value = texture;
    for(var i = 0; i < fbMaterial.fbos.length; i++){
      fbMaterial.fbos[i].material.uniforms.time.value = time;
      if(fbMaterial.fbos[i].material.uniforms["r2"])fbMaterial.fbos[i].material.uniforms["r2"].value = r2;
      fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(mouse.x*0.5+Math.sin(time)*0.5, mouse.y*0.5+Math.cos(time)*0.5);
      // fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(mouse.x,mouse.y);
      // fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(0.0,0.0);
      // fbMaterial.material.uniforms.mouse.value = new THREE.Vector2(renderSize.x/10, renderSize.y/2);

    }
    // _mesh.material.uniforms.time.value = time;
    // _mesh.material.uniforms.mouse.value = new THREE.Vector2(mouse.x*0.5,mouse.y*0.5);;

    // _renderer.render(_scene, _camera);
    // _texture.needsUpdate = true;
    // texture.needsUpdate = true;
    // fbTex.needsUpdate = true;

    fbMaterial.update();
    renderer.render(scene, camera);
    // fbMaterial.expand(1.005);
    fbMaterial.getNewFrame();
    fbMaterial.swapBuffers();

    // normalRenderer.render(normalScene, normalCamera);

    capturer.capture( renderer.domElement );

}
function screenshot(renderer) {
    if (event.keyCode == "32") {
        grabScreen(renderer);

        function grabScreen(renderer) {
            var blob = dataURItoBlob(renderer.domElement.toDataURL('image/png'));
            var file = window.URL.createObjectURL(blob);
            var img = new Image();
            img.src = file;
            img.onload = function(e) {
                window.open(this.src);

            }
        }
        function dataURItoBlob(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        }

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
    if (event.keyCode == "82") {
                    capturer.start();
    }
    if (event.keyCode == "84") {
        capturer.stop();
        capturer.save(function(blob) {
            window.location = blob;
        });
    }
}
function hslaColor(h,s,l,a)
  {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }