#jquery.gmap3 について

##概要
Google Maps API V3 を使用した地図の描画を手助けするプラグインです。  
マーカーの複数表示や、オリジナルマーカー画像の使用も簡単に出来ます。  
また、ジオコーディングを使った住所による座標指定も可能です。

##使い方
まずは、Google Maps APIを読み込みます。

    <script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>

次に、jQuery本体と、このプラグインを読み込みます。

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.gmap3.js"></script>

準備完了。gmap3を呼び出しましょう。

    $(function() {
    
      $("#gMap").gmap3({
        address: '埼玉',
        latitude: 37.5,
        longitude: 137.5,
        zoom: 8,
        navigationControl: true,
        mapTypeControl: true,
        scaleControl: true,
        markers: [
          {
            latitude: 35.916158,
            longitude: 139.6333813,
            title: '大宮アルディージャ',
            content: '<div class="infoWindowWrapper"><h4>大宮アルディージャ</h4><p>NACK5スタジアム大宮</p></div>',
            openInfo: true
          },
          {
            address: '千葉県柏市日立台1-2-50',
            title: '柏レイソル',
            icon: "images/pin_32.png",
            content: '<div class="infoWindowWrapper"><h4>柏レイソル</h4><p>日立柏サッカー場</p></div>'
          },
          {
            address: '味の素スタジアム',
            title: 'FC東京',
            content: '<div class="infoWindowWrapper"><h4>FC東京</h4><p>味の素スタジアム</p></div>'
          },
          {
            latitude: 35.5855341,
            longitude: 139.6526983,
            title: '川崎フロンターレ',
            content: '<div class="infoWindowWrapper"><h4>川崎フロンターレ</h4><p>等々力陸上競技場</p></div>'
          },
          {
            latitude: 35.5099805,
            longitude: 139.6064192,
            title: '横浜Ｆ・マリノス',
            content: '<div class="infoWindowWrapper"><h4>横浜Ｆ・マリノス</h4><p>日産スタジアム</p></div>'
          }
        ]
      });
    
    });

「address」と「latitude, longitude」はどちらかを指定すればOK。両方指定した場合は「address」が優先されます。

##マップオプション
+   `address: String` :
    住所・地名など
 
+   `latitude : Number` :
    緯度
 
+   `longitude : Number` :
    経度
 
+   `zoom : int` :
    縮尺
 
+   `navigationControl : Boolean` :
    地図の操作部の表示・非表示
 
+   `mapTypeControl : Boolean` :
    地図タイプ選択部の表示・非表示
 
+   `scaleControl : Boolean` :
    縮尺の表示・非表示
 
+   `markers : Array` :
    マーカーの数だけ配列にマーカーオブジェクト（下記）を追加

##マーカーオプション
+   `markerObj.latitude : Number` :
    マーカーの緯度

+   `markerObj.longitude : Number` :
    マーカーの経度

+   `markerObj.title : String` :
    マーカーのタイトル（ホバー時にでる）

+   `markerObj.content : String` :
    マーカーの吹き出しに表示されるHTMLタグ

+   `markerObj.icon : String` :
    マーカーの画像を変えたい場合、パスを記述

+   `markerObj.openInfo : Boolean` :
    trueなら起動時に吹き出しが自動的に開く

##静的メソッド
####マーカーの追加
    $.gmap3.addMarker($gmap, markerOption)  

+   `$gmap` :
    gmap3() 適用済みの jQuery オブジェクト（例）$(#map'')

+   `markerOption` :
    マーカーオプション

####全てのマーカーの削除
    $.gmap3.removeAllMarkers($gmap)  

+   `$gmap` :
    gmap3() 適用済みの jQuery オブジェクト（例）$(#map'')

####地図中心位置の変更（アニメーション付き）
    $.gmap3.panTo($gmap, position)

+   `$gmap` :
    gmap3() 適用済みの jQuery オブジェクト（例）$(#map'')

+   `position` :
    `{address: "住所"}` or `{latitude: 緯度, longitude: 経度}`

##注意点
ジオコーディングによる緯度経度の取得は同時に10件までしか動作しないようです。（APIの仕様）
