regionObject = new RegionObject({
    coordinates: [
        [50,50], [50,51], [50,52], [50,53],
        [51,50], [51,51], [51,52], [51,53],
        [52, 50], [52, 51],[52, 52], [52,53],
        [53, 50], [53, 51],[53, 52], [53,53],
    ],
    etalonPointImageData: [255, 0, 0, 0]
});

regionObject.makeLayoutFromCanvas(canvas);

ctx.fillStyle = 'red';
ctx.fillRect(50,50,4,4);

pxRegion.addRegion(regionObject);

ctx.getImageData(50,50,1,1).data[0] = 255;