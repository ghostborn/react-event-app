import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { InputGroup } from "../components/InputGroup.tsx";
import { useForm } from "../hooks/useForm.tsx";
import { Button } from "../components/Button.tsx";
import { ErrorMessage } from "../components/ErrorMessage.tsx";

type LoginForm = {
  email: string;
  password: string;
};

const initialValues: LoginForm = {
  email: "",
  password: ""
};

export function LoginPage() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validate = (values: LoginForm) => {
    const errors: Partial<LoginForm> = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const { values: formData, errors, error, isLoading, handleChange, handleSubmit } = useForm<LoginForm>({
    initialValues,
    validate,
    onSubmit: async values => {
      const user = await login(values.email, values.password);
      if (user) {
        authLogin(user);
        navigate(from, { replace: true });
      } else {
        throw new Error("Invalid email or password");
      }
    }
  });


}