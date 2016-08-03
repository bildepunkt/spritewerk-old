
function init () {
    let viewport = new Viewport(800, 800);
    let scene = new Scene(viewport.canvas, new Transform(), true);
    let grp = new Group();
    
    let grpA = new Group();
    let sprtA = new Sprite();
    let grpB = new Group();
    let sprtB = new Sprite();
    let grpC = new Group();
    let sprtC = new Sprite();
    
    let dr = 0;

    sprtA.x = -32;
    sprtA.y = -32;
    sprtB.x = -32;
    sprtB.y = -32;
    sprtC.x = -32;
    sprtC.y = -32;
    
    grpA.x = 128;
    grpB.x = 192;
    grpC.x = 256;

    grp.x = 400;
    grp.y = 400;

    scene.items.push(grp);
    
    grp.items.push(grpA);
    grp.items.push(grpB);
    grp.items.push(grpC);
    
    grpA.items.push(sprtA);
    grpB.items.push(sprtB);
    grpC.items.push(sprtC);

    function render () {
        grp.rot = ++dr;
        grpB.rot = -dr;
        grpC.rot = dr;
        
        scene.startRender();
        
        requestAnimationFrame(render);
    }

    render();
}