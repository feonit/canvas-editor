//regionObject = new RegionObject({
//    coordinates: [
//        [50,50], [50,51], [50,52], [50,53],[50,54],[50,55],
//        [51,50], [51,51], [51,52], [51,53],[51,54],[51,55],
//        [52, 50],[52, 51],[52, 52],[52,53],[52,54],[52,55],
//        [53, 50],[53, 51],[53, 52],[53,53],[53,54],[53,55],
//        [54, 50],[54, 51],[54, 52],[54,53],[54,54],[54,55],
//        [55, 50],[55, 51],[55, 52],[55,53],[55,54],[55,55],
//    ],
//    etalonPointImageData: [255, 0, 0, 0]
//});
//
//regionObject.makeLayoutFromCanvas(canvas);
//
//ctx.fillStyle = 'red';
//ctx.fillRect(50,50,6,6);
//
//pxRegion.addRegion(regionObject);
//
//ctx.getImageData(50,50,1,1).data[0] = 255;


//var that = this;
//function runTest(){
//    var start;
//    var find;
//    var end;
//    var diff = 0;
//    var center = 0;
//    var i = 1;
//
//    var id = setInterval(function(){
//
//        start = +new Date();
//        find = that.searchPoints(100, 100, beforeActivatingRegionCanvasImageData, canvas.width, canvas.height);
//        end =  +new Date();
//        diff = end - start;
//
//        center += diff;
//
//        console.log('TIME: ', diff, 'CENTER: ', parseInt(center/i++, 10));
//
//        if (i == 30){
//            clearInterval(id);
//        }
//    }, 500);
//}
//runTest();


function debugTimeWrapper(fn, message){
    return function(){
        var start = +new Date();
        var res = fn.apply(this, arguments);
        var end =  +new Date();
        var diff = end - start;
        console.log(message+': ' + diff);
        return res;
    };
}

function limitCallWrapper(fn, message){
    var i = 0;
    var max = 1000;
    return function(){
        i++;
        if (i < max){
            return fn.apply(this, arguments);
        } else {
            throw message+': ' + i;
        }
    };
}