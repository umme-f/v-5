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
          uploadedFile: "Uploaded File",
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
          uploadedFile: "アップロードされたファイル名"
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
