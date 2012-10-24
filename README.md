Parameters:

geometry -> Any kind of geometry as first parameter (for now it must have at least 2 faces in order to work)

int multiplier -> the higher is this number, the higher is the number of particles (the number is multiplied by 120)

boolean wireFrame -> if true it creates the sprayWireframe

float frame -> if you set the float size for this, it creates a sort of frame for each face.

boolean innerFrame -> the frame fills the center of each face.

boolean area -> if true it fills the area of each face.

float extrude -> if you set the float size for this, it fills an extra dimension for each face (inner volume).

boolean extrudeOut -> if true, the direction of "extrude" is reversed (outwards)

Vector2 percentage -> sets the filling percentage of each zone (border, area, volume). 
Eg. vector (15, 50) -> edge 15%, 35% area, volume 50%

string fun -> 10 different example effects (to be improved and better integrated into the code).