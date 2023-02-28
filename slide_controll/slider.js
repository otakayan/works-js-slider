let slide;
let image;
let TimeID;
let timeID;
let cnt=0; //最初に動く画像
let cnt2=1; //次の画像
let posi1;
let posi2;
let flag=true;
let max_width;
let max_height;
let controll;
let btn;
let stop_time=2000;//画像の停止時間
let idou_time=10;
let idou__kyori=5;//画像が上記idou_time＋処理時間で5px移動
let keika_time;

function disp(){ //次の画像を準備する関数
	cnt2=cnt+1; //
	if(cnt2===image.length){ //画像の枚数に達したら
		cnt2=0; //0に戻す
	}
	image[cnt2].style.display="list-item"; //３枚目以降はnoneになっているものを表示
	posi1=0;
	posi2=max_width;
	slider();
	timeID=setTimeout(disp,keika_time+stop_time); //動き終わって＋停止時間が経過したら自己呼出
}

function slider(){
	TimeID=setTimeout(slider,idou_time);
	posi1-=idou__kyori;
	posi2-=idou__kyori;//同じ距離ずつずらしていく -=で減算
	image[cnt].style.left=posi1+"px";
	image[cnt2].style.left=posi2+"px";
	if(posi2<=5){ //画像サイズが5pxで余りが発生していたら
		image[cnt2].style.left="0px";
		btn[cnt].style.opacity="1.0"; //ページネーションの透過度を変更
		btn[cnt2].style.opacity="0.5"; //ページネーションの透過度を変更 現在表示
		image[cnt].style.display="none"; //画面外の画像
		cnt++; //cntのインクリメント
		if(cnt===image.length){ //画像の枚数に達したら
			cnt=0; //最初に戻す
		}
		clearTimeout(TimeID); //次のsetTimeout呼出
	}
}
window.onload=function(){  //ここから始まる（画面ロードされたらスタート）画像の読み込みを終える
	let con="<ul id='controll'>"; //変数conにulタグを代入　ページネーション作成用
	max_width=0; //変数に０を代入
	max_height=0; //変数に０を代入
	slide=document.getElementById("slide") //変数slideにid(slide)情報を代入
	image=slide.getElementsByTagName("li"); //変数imageにli情報を代入
	for(i=0;i<image.length;i++){ //image変数の中のliの数だけループ
		let width=image[i].getElementsByTagName("img")[0].naturalWidth; // imageのliそれぞれの本来の横幅を返す
		let height=image[i].getElementsByTagName("img")[0].naturalHeight; //// imageのliそれぞれの本来の縦幅を返す
//naturalWidth・naturalHeight・・・画像のサイズ取得
		if(max_width<width){ //widthは画像サイズ
			max_width=width; //max_width変数に画像サイズを代入
		}
		if(max_height<height){ //heightは画像サイズ
			max_height=height; ////max_height変数に画像サイズを代入
		}
		con+="<li onclick='idou("+i+")'><span class='pagenation'>●</span></li>"; //変数conにイベント付与したliタグを代入(ページネーション作成)　iは画像の数だけインクリメントされる
	} //上記ループを抜けたら
	con+="</ul><div id='back' onclick='idou(cnt-1)'></div><div id='next' onclick='idou(cnt+1)'></div>"; // 戻る、進むボタンの作成（cnt-1）前の画像
	slide.insertAdjacentHTML ("afterend",con); // id(slide)タグの後に追加作成
	controll=document.getElementById("controll"); //変数conに作成してあるid(controll)情報を取得→変数controll作成
	btn=controll.getElementsByTagName("li"); //ul(controll)の中のli情報（ページネーション）を取得して変数btnに代入
	controll.style.width=max_width+"px"; //(css) id(controll)の横幅のみ画像サイズと同じ幅で指定
	slide.style.width=max_width+"px"; //(css) id(slide)画像そのものの親要素ulに画像サイズ（横幅）を指定
	slide.style.height=max_height+"px"; //(css) id(slide)画像そのものの親要素ulに画像サイズ（縦幅）を指定
	image[1].style.left=max_width+"px"; //(css) 画面の外で次の画像を準備させている
	let clientRect=slide.getBoundingClientRect(); //windowの中のclientの座標取得
	let slide_x=window.pageXOffset+clientRect.left; //スクロールした量＋windowからclientの座標までの距離（左）
	let slide_y=window.pageYOffset+clientRect.top; //スクロールした量＋windowからclientの座標までの距離（上）
	console.log(slide_x);
	console.log(slide_y);

	/*
	getBoundingClientRect()・・・要素の座標取得
	上記の.left・.top・・・画面端からの指定方向距離
	window.pageXOffset・window.pageYOffset・・・windowのスクロール量
	これを利用し以下で表示場所指定
*/
//画像のサイズを把握してから、戻る進むボタンの設置
	const next=document.getElementById("next"); //進むボタン情報
	const back=document.getElementById("back"); //戻るボタン情報
	next.style.left=(slide_x+max_width+20)+"px"; //(css)
	back.style.left=(slide_x-70)+"px"; //(css)
	next.style.top=((slide_y+max_height)/2+50)+"px"; //(css)
	back.style.top=((slide_y+max_height)/2+50)+"px"; //(css)
	keika_time=(Math.floor(max_width/idou__kyori))*(idou_time+5);//5は処理時間5ms目安
	timeID=setTimeout(disp,stop_time); //stop_time経過後にdisp関数を実行

	// 上記ボタン位置はレスポンシブ対応が必要
}
function idou(x){
	clearTimeout(TimeID); //TimeID=setTimeout(slider,idou_time);
	clearTimeout(timeID); //timeID=setTimeout(disp,stop_time);
	if(x<0){ //1枚目の画像のときに戻るボタンを押した場合
		x=image.length-1;
	}
	if(x>=image.length){ //最後の画像のときに進むボタンを押した場合
		x=0;
	}
	image[x].style.left="0px";
	image[cnt].style.display="none";
	image[cnt2].style.display="none";
	image[x].style.display="list-item";
	btn[cnt].style.opacity="1";
	btn[x].style.opacity="0.5";
	let y=x+1;
	if(y==image.length){
		y=0;
	}
	image[y].style.left=max_width+"px";
	image[y].style.display="list-item";
	cnt=x; //他の関数でも使えるようにcntに戻す
	timeID=setTimeout(disp,stop_time);
}
