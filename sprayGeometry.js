/**
 * @author roriz87 -> http://pi-note.com/ -> roriz@pi-note.com
 */
 
sprayGeometry = function(geometry, options){
	// SETTINGS
	if ( !options ) options = {};
	
	var iQuality = !options['multiplier']? 40 : options['multiplier'];
	var bWireFrame = !options['wireFrame']? false : options['wireFrame'];
	var fFrame = !options['frame']? 0 : options['frame'];
	var bInner = !options['innerFrame']? false : options['innerFrame'];
	var bArea = !options['area']? false : options['area'];
	var iExtrude = !options['extrude']? 0 : options['extrude'];
	var bOut = !options['extrudeOut']? 0 : options['extrudeOut'];
	var vPerc = !options['percentage']? new THREE.Vector2(15,50) : options['percentage'];
	// strings are: "funA" "fun1" "fun2" "fun3"... "fun9"
	var sFun = !options['fun']? "" : options['fun'];
	
	//
	var iInner = (bInner)?0:1;
	var iOut = (bOut)?1:-1;
	if(iExtrude)bArea=true;
	if(sFun=="funA" || sFun=="sFunB")bArea=true;
	// INTERNAL VARIABLES
	var sprayGeometry = new THREE.Geometry();	
	
	var vertices = geometry.vertices;
	var faces = geometry.faces;
	var fl = faces.length;
	var n = iQuality*120;
	var l = Math.floor(n/fl);
	
	var t, t1, r, f, fi, k, c, a, b, j=0; 
	
	var p = new THREE.Vector3(), pa = new THREE.Vector3(), pb = new THREE.Vector3(), p= new THREE.Vector3(), 
		p1= new THREE.Vector3();
	//LOOP
	for(var i=0; i<n; i++){
		if(i%l == 0 && j<fl-1){
			j=(i==0)?j:j+1;
			f=(faces[j] instanceof THREE.Face3)?3:4;
			k=(faces[j] instanceof THREE.Face3)?1:2;
			fi = new Array(faces[j].a,faces[j].b,faces[j].c, faces[j].d);						
			c = faces[j].centroid;
		}
					
		a = i%f; 
		b = (i+1)%f;
		
		pa.set(vertices[fi[a]].x, vertices[fi[a]].y, vertices[fi[a]].z);
		pb.set(vertices[fi[b]].x, vertices[fi[b]].y, vertices[fi[b]].z);

		t = Math.random();	
		p.copy(pb).subSelf(pa).multiplyScalar(t).addSelf(pa);
		
		pa.set(vertices[fi[(k+i)%f]].x, vertices[fi[(k+i)%f]].y, vertices[fi[(k+i)%f]].z);
		pb.set(vertices[fi[(k+i+1)%f]].x, vertices[fi[(k+i+1)%f]].y, vertices[fi[(k+i+1)%f]].z);

		t1 = (sFun)?t:Math.random();
		p1.copy(pb).subSelf(pa).multiplyScalar(t1).addSelf(pa);
		
		r = (sFun)?t*100:Math.random()*100;	
		
		if(!sFun || sFun=="funA" || sFun=="funB")
		if(r<vPerc.x && fFrame){
			t1 = iInner-Math.random()*fFrame;
			
			p.subSelf(c).multiplyScalar(t1).addSelf(c);
		}else if(((r>vPerc.x && bArea) || !bWireFrame)){
			t1 = Math.random();
			
			p1.subSelf(p).multiplyScalar(t1).addSelf(p);
			p.copy(p1);			
			
			if(r>vPerc.y && iExtrude){
				t1 = Math.random()*iExtrude*iOut;
				t1:t;
				p.copy(faces[j].normal).multiplyScalar(t1).addSelf(p1);				
			}	
			if(sFun=="funB")p.set(0);
		}
		//SOME OF THE OTHER MANY WEIRD EFFECTS POSSIBLE!
		if(sFun == "fun1"){
			p.subSelf(c).multiplyScalar(t1).addSelf(c);
			p1.subSelf(p).multiplyScalar(t1).addSelf(p);
		}else if(sFun == "fun2"){
			p1.subSelf(p).multiplyScalar(t1).addSelf(p);
			p.copy(p1);	
		}else if(sFun == "fun3"){
			p.copy(pb).subSelf(c).multiplyScalar(t1).addSelf(pb);
		}else if(sFun == "fun4" || sFun== "fun5"){
			var m = (sFun=="fun4")?-150:150;
			p.subSelf(c).multiplyScalar(t1).addSelf(c);
			p1.subSelf(p).multiplyScalar(t1).addSelf(p);
			p.copy(faces[j].normal).multiplyScalar(m*Math.sin(t1)).addSelf(p1);
		}else if(sFun=="fun6"){
			if(r<vPerc.x+30 ){
				t1 = Math.random()/2;			
				p.subSelf(c).multiplyScalar(t1).addSelf(c);
			}			
		}else if(sFun=="fun7"){
			t1 = Math.random()/1.3;			
			p.subSelf(c).multiplyScalar(t1).addSelf(c);
		}else if(sFun=="fun8"){
			if(r<vPerc.x+30 ){
				t1 = Math.random()*2;			
				p.subSelf(c).multiplyScalar(t1).addSelf(c);
			}			
		}else if(sFun=="fun9"){
			if(r<vPerc.x ){
				t1 = Math.abs(Math.sin(r)/2);			
				p.subSelf(c).multiplyScalar(t1).addSelf(c);
			}			
		}
		
		sprayGeometry.vertices.push( new THREE.Vector3( p.x, p.y, p.z ) );
		
	}	
	return sprayGeometry;	
}