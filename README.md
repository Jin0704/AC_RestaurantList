# 餐廳清單V1.2
本專案為第一版本，現主要提供基本索引網站上餐廳資訊，及餐廳獨立介紹頁面，首頁亦有搜尋功能提供查找餐廳。

## 功能V1.2
  + 基本首頁觀看餐廳名稱
  + 個別頁面詳細察看餐廳資訊、地址、簡介......等等
  + 搜尋功能幫助查找特定餐廳
  + 新增資料庫功能，可自行編輯刪除餐廳相關資訊(需安裝MongoDB; 本次更新日期2020.08.30)
  + 路由重新設定(2020.09.13)
  + 增加排序功能(2020.09.13)
  

## 環境建置
  + Node.js

## 專案安裝流程
1. 開啟終端機，並下載本專案至本機電腦
```
git clone https://github.com/Jin0704/AC_RestaurantList.git
```
2. 運用終端機進入擺放專案的資料夾
```
cd AC_RestaurantList
```
3. 安裝npm套件
```
輸入 npm init -y
```
4. 載入起始資料
```
輸入 npm run seed
出現 mongodb connected 表示連線成功
出現 done 表示資料載入完成
```
5. 啟動伺服器
```
輸入 npn run dev指令
```
6. 當終端機出現以下訊息，表示專案運行成功
```
RestaurantList is running on http://localhost:3000
Is connecting
```
7. 現在，您可上http://localhost:3000 使用本專案