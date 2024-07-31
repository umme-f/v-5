import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome!\n Enter Email ID and Password.",
          email: "Email",
          password: "Password",
          remember: "Remember me",
          forgotPassword: "Forgot password?",
          login: "Login",
          search: "Search",
          add: "Add",
          edit: "Edit",
          delete: "Delete",
          role: "Role",
          previousPage: "Previous Page",
          editcar: "Edit Car",
          carID: " Car ID",
          carname: "Car Name",
          carType: "Car Type",
          year: "Year",
          nextupdatedate: "Next Update Date",
          save: "Save",
          cancel:"Cancel",
          changepassword: "Change Password",
          logout: "Logout",
          carmakername: "Car Maker Name",
          lastmileage: "Last Mileage",
          writedetails: "Write Details",
          fileupload: "File Upload",
          remainingcharacters: "Remaining characters: ",
          cardetails: "Car Details",
          confirmdelete: "Confirm Delete",
          deleteconfirmmessage: "Are you sure you want to delete this item?",
          carAddForm: "Car Add Form",
          toastAddWarning: "Please fill in all mandatory fields.",
          toastNumericWarning: "Please enter numeric value only.",
          uploadedFile: "Add File",
          upload: "Upload",
          showDetails: "Show Details",
          toastUploadSuccess:"File uploaded successfully.",
          toastUploadError: "An error occured while uploading the file.",
          toastFetchError: "Could not fetch data.",
          closeList : "Close list", 
          compulsoryInsuranceCertificate: "Compulsory Inspection Certificate",
          vehicleInspectionCertificate: "Vehicle Inspection Certificate",
          inspectiondate: "Inspection Date",
          purchase: "Purchase",
          lease: "Lease",
          duplicateFileWarning: "You already have a file with same name!",
          // duplicateDelete 
          updatedate: "inspection day",
          toastDeleteSuccess: "File Deleted successfully",
          toastDeleteError: "Couldnot delete the file.",
          toastDeleteWarning: "Please select data from the table to delete.",
          openlink: "Open File",
          choosefiles : "Add Files",
          uploadTime: "Time of upload",
          deletefile:"File Delete",
          toastAddSuccessfulSaving: "Information is saved successfully!",
          fileUploadFailed: "File upload failed",
          toastNoFileSelected :"No file is selected.",
          addRow: "Add row",
          removeRow: "Remove row",
          selectdate: "Select Date",
          explanationAdd: "※ How to upload file: Click add row → file upload → check box → file upload press again → select the column name ",
          explanationDelete: "※ how to delete row: press remove row → check box → press delete row button again ",
          clickAddRowFirst: "Click 'Add Row' button first.",
          pleaseAddNewRow: "Please add a new row by pressing the 'Add Row' button.",
        },
      },
      jp: {
        translation: {
          welcome: "ようこそ！\n メールアドレスとパスワードを入力してください。",
          email: "メ－ル",
          password: "パスワード",
          remember: "私を覚えてますか。",
          forgotPassword: "パスワードをお忘れですか？",
          login: "ログイン",
          role: "Role",
          search: '検索',
          add: "車を追加",
          edit: "編集する",
          delete: "デリート",
          previousPage: "前のページ",
          editcar: "車を編集",
          carID: " 車のID",
          carname: "車名",
          // 
          carType: "車の種類",
          year: "年",
          nextupdatedate: "次回更新日",
          save: "保存",
          cancel:"キャンセル",
          changepassword: "パスワードを変更する",
          logout: "ログアウト",
          carmakername: "自動車メーカー名",
          lastmileage: "最後の走行距離",
          writedetails: "詳細を記入してください。",
          fileupload: "ファイルをアップロード",
          remainingcharacters: "残り文字数: ",
          cardetails: "車の詳細",
          confirmdelete: "削除を確認",
          deleteconfirmmessage: "このアイテムを削除してもよろしいですか?",
          carAddForm: "車追加フォーム",
          toastAddWarning: "必須項目はすべて入力してください。.",
          toastNumericWarning: "数値のみ入力してください。",
          uploadedFile: "アップロードされたファイル名",
          upload: "アップロード",
          showDetails: "詳細を表示",
          toastUploadSuccess:"ファイルが正常にアップロードされました。",
          toastUploadError: "ファイルのアップロード中にエラーが発生しました。",
          toastFetchError: "データを取得できませんでした。",
          closeList : "リストを閉じる", 
          compulsoryInsuranceCertificate: "自賠責保険",
          vehicleInspectionCertificate: "車検証",
          inspectiondate: "検査日",
          purchase: "購入",
          lease: "リース",          
          duplicateFileWarning: "同じ名前のファイルが既に存在します。",
          updatedate:"検査日",
          toastDeleteSuccess: "ファイルが正常に削除されました。",
          toastDeleteError: "ファイルを削除できませんでした。",
          toastDeleteWarning: "表からデータを選択してください。",
          openlink: "ファイルを開く",
          choosefiles : "ファイルを追加",
          uploadTime: "アップロードの時間。",
          deletefile:"ファイルを削除する",
          toastAddSuccessfulSaving: "情報が正常に保存されました!",
          toastNoFileSelected :"ファイルが選択されていません。",
          addRow: "Add row",
          removeRow: "Remove row",
          selectdate: "Select Date",
          explanationAdd: "※ ファイルのアップロード方法: 行の追加をクリック → ファイルのアップロード → チェックボックスをオンにして → ファイルのアップロードをもう一度押す → 列名を選択",
          explanationDelete: "※ 行を削除する方法: 行の削除を押す → チェックボックスをオンにする → 行の削除ボタンをもう一度押す ",
          clickAddRowFirst: "「行を追加」ボタンをクリックしてください。",
          pleaseAddNewRow: "「行を追加」ボタンを押して新しい行を追加してください。",
        },
      },
    },
    fallbackLng: 'jp',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
