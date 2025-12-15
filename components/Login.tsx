import React, { useEffect } from 'react';
import { UserProfile } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleCredentialResponse = (response: any) => {
    try {
      // Decode JWT token to get user info
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const payload = JSON.parse(jsonPayload);
      
      const user: UserProfile = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };
      
      onLogin(user);
    } catch (error) {
      console.error("Error decoding Google credential", error);
    }
  };

  useEffect(() => {
    // Note: In a production environment, this Client ID should be in process.env
    // and configured in the Google Cloud Console.
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "100%", text: "continue_with" }
      );
    }
  }, []);

  const handleGuestLogin = () => {
    onLogin({
      name: "Guest User",
      email: "guest@hairsphere.app",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-peach-50 relative overflow-hidden">
      {/* Decorative background elements using the color palette */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-peach-200/50 blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-peach-300/30 blur-[100px]"></div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-peach-100 w-full max-w-md relative z-10 mx-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-peach-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-peach-200">
            <span className="font-serif text-white font-bold text-3xl">H</span>
          </div>
          <h1 className="text-3xl font-serif text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your hair growth journey.</p>
        </div>

        <div className="space-y-4">
          {/* Google Sign In Container */}
          <div id="googleSignInDiv" className="w-full flex justify-center h-[44px]"></div>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue as</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            onClick={handleGuestLogin}
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-gray-200"
          >
            Guest User
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">
             By continuing, you agree to HairSphere's <a href="#" className="underline hover:text-peach-500">Terms</a> and <a href="#" className="underline hover:text-peach-500">Privacy Policy</a>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
