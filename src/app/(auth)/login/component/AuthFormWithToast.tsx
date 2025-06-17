'use client'
import AuthForm from './AuthForm';
import ToastProvider, { useToast } from './ToastProvider';

const AuthFormContent = () => {
  const toast = useToast();
  return <AuthForm toast={toast} />;
};

const AuthFormWithToast = () => {
  return (
    <ToastProvider>
      <AuthFormContent />
    </ToastProvider>
  );
};

export default AuthFormWithToast;
