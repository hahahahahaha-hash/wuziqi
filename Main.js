var canvas;
var context;
var isWhite=false;
var isWell=false;
var img_b=new Image();
img_b.src="img_b.png";
var img_w=new Image();
img_w.src="img_w.png";
var chessData=new Array(15);
for(var x=0;x<15;x++){
    chessData[x]=new Array(15);
    for(var y=0;y<15;y++){
        chessData[x][y]=0;
    }
}

//画棋盘
function drawRect(){
    canvas=document.getElementById("canvas");
    context=canvas.getContext("2d");
    context.fillStyle="orange";
    context.fillRect(0,0,640,640);
    context.fillStyle="#000000";
    for(var i=0;i<=640;i+=40){
        context.beginPath();
        context.moveTo(0,i);
        context.lineTo(640,i);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(i,0);
        context.lineTo(i,640);
        context.closePath();
        context.stroke();
    }
}

//下棋过程
function play(e){
    var x=parseInt((e.clientX-20)/40);
    var y=parseInt((e.clientY-20)/40);
    if(chessData[x][y]!=0){
        return;
    }
    if(isWhite){
        isWhite=false;
        drawChess(1,x,y);
    }
    else{
        isWhite=true;
        drawChess(2,x,y);
    }
}

//画棋子
function drawChess(chess,x,y){
    if(isWell==true){
        alert(" 已经结束了，可刷新再玩");
        return;
    }
    if(x>=0&&x<15&&y>=0&&y<15){
        if(chess==1){
            context.drawImage(img_w,x*40+20,y*40+20,36,36);
            chessData[x][y]=1;
        }
        else{
            context.drawImage(img_b,x*40+20,y*40+20,36,36);
            chessData[x][y]=2;
        }
        judge(x,y,chess);
    }
}

//判断胜负
function judge(x,y,chess){
    var count1=0;
    var count2=0;
    var count3=0;
    var count4=0;
    //横向判断
    for(var i=x;i>=0;i--){
        if(chessData[i][y]!=chess){
            break;
        }
        count1++;
    }
    for(var i=x+1;i<15;i++){
        if(chessData[i][y]!=chess){
            break;
        }
        count1++;
    }
    //纵向判断
    for(var i=y;i>=0;i--){
        if(chessData[x][i]!=chess){
            break;
        }
        count2++;
    }
    for(var i=y+1;i<15;i++){
        if(chessData[x][i]!=chess){
            break;
        }
        count2++;
    }
    //左上右下判断
    for(var i=x,j=y;i>=0,j>=0;i--,j--){
        if(chessData[i][j]!=chess){
            break;
        }
        count3++;
    }
    for(var i=x+1,j=y+1;i<15,j<15;i++,j++){
        if(chessData[i][j]!=chess){
            break;
        }
        count3++;
    }
    //左下右上判断
    for(var i=x+1,j=y-1;i<15,j>=0;i++,j--){
        if(chessData[i][j]!=chess){
            break;
        }
        count4++;
    }
    for(var i=x,j=y;i>=0,j<15;i--,j++){
        if(chessData[i][j]!=chess){
            break;
        }
        count4++;
    }
    //总判断
    if(count1>=5||count2>=5||count3>=5||count4>=5){
        if(chess==1)alert("白棋赢了");
        else alert("黑棋赢了");
        isWell=true;
    }
}