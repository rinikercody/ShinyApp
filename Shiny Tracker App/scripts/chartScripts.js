

aTest = function(){
    $.ajax({
        url: "./ajaxTest.json",
        async: false,
        success: function (data){

        CodyPoints = JSON.parse(data);
var canvas = document.getElementById('main-canvas');
var ctx = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 300;

const XSCALE = 55;
const PADDINGX = canvas.width/15;
const YSCALE = 15;
const PADDINGY = canvas.height/10;

months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
]

const BARSIZE = 20;

TeresaPoints = [
    {"name": "teresa","month": 0, "shinys": 3},
    {"name": "teresa","month": 5, "shinys": 15},
    {"name": "teresa","month": 9, "shinys": 4},
]

for(var i = 0; i < 16; i++){
    ctx.fillStyle = 'black';
    ctx.beginPath()
    ctx.fillText(15 - i,5,(i * YSCALE) + PADDINGY);
    ctx.moveTo(PADDINGX, (i * YSCALE) + PADDINGY);
    ctx.lineTo(canvas.width - PADDINGX,(i * YSCALE) + PADDINGY);
    ctx.stroke();
}

for(var i = PADDINGX; i < canvas.width - PADDINGX; i += XSCALE){
    ctx.fillStyle = 'black';
    ctx.beginPath()
    ctx.fillText(months[(i - PADDINGX)/XSCALE],i + 10,canvas.height - 5);
}


for(var i = 0; i < CodyPoints.length; i++){
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';

    ctx.fillRect(CodyPoints[i].month * XSCALE + PADDINGX,canvas.height - PADDINGY - (CodyPoints[i].shinys + 1) * YSCALE,BARSIZE,CodyPoints[i].shinys * YSCALE)
    ctx.fillStyle = 'black';
    //ctx.fillText(Cody[i].shinys);
    /*
    ctx.beginPath();
    ctx.arc(CodyPoints[i].month * XSCALE + PADDINGX,CodyPoints[i].shinys * YSCALE + PADDINGY + 1,5,0,2 * Math.PI);
    ctx.fill();
    if(i > 0){
        ctx.moveTo(CodyPoints[i-1].month * XSCALE + PADDINGX,CodyPoints[i-1].shinys * YSCALE + PADDINGY + 1);
        ctx.lineTo(CodyPoints[i].month * XSCALE + PADDINGX,CodyPoints[i].shinys * YSCALE + PADDINGY + 1);
        ctx.stroke();
    }
    */ 
}

for(var i = 0; i < TeresaPoints.length; i++){
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'purple';

    ctx.fillRect(TeresaPoints[i].month * XSCALE + PADDINGX + BARSIZE,canvas.height - PADDINGY - (TeresaPoints[i].shinys + 1) * YSCALE,BARSIZE,TeresaPoints[i].shinys * YSCALE)
    /*
    ctx.beginPath();
    ctx.arc(TeresaPoints[i].month * XSCALE + PADDINGX,TeresaPoints[i].shinys * YSCALE + PADDINGY + 1,5,0,2 * Math.PI);
    ctx.fill();
    if(i > 0){
        ctx.moveTo(TeresaPoints[i-1].month * XSCALE + PADDINGX,TeresaPoints[i-1].shinys * YSCALE + PADDINGY + 1);
        ctx.lineTo(TeresaPoints[i].month * XSCALE + PADDINGX,TeresaPoints[i].shinys * YSCALE + PADDINGY + 1);
        ctx.stroke();
    }
    */
}


                //alert(data);
            }
        });
};
aTest();
