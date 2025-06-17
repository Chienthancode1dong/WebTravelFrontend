import ImageSlider from "./component/Slider";
import AuthFormWithToast from "./component/AuthFormWithToast";

const LoginPage = () => {


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
          <AuthFormWithToast />
          <ImageSlider />
        </div>
      </div>
    </>
  )
}

export default LoginPage