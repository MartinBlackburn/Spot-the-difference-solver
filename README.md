#Spot the difference solver

A browser based spot the difference solver.

##How it works
The camera takes an two images (marked out by the black box). It then compares the left image to the right image, pixel by pixel. 

Then by assuming the RGB colours are a point in 3D space you can then get the disatance between them and if it is over a certian 
amount a green overlay is added to that pixel.