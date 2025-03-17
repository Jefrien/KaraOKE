import { createClient } from "@/services/supabase/server";
import DropboxConnect from "./components/DropboxConnect";
import Login from "./components/Login";
import Notification from "@/app/components/Notification";
import { verifyDropbox } from "@/app/dropbox/actions";
import Profile from "./components/Profile";
import { User } from "@supabase/supabase-js";

export default async function Settings() {

    const supabase = await createClient()
    let logged = false

    const { data, error } = await supabase.auth.getUser()
    if (!error && data?.user) {        
        logged = true
    }    

    const dropbox = await verifyDropbox()

    return (
        <div>
            <h2 className="text-3xl font-bold text-white ">Ajustes</h2>
            {logged && !dropbox && <DropboxConnect />}
            {!logged && <Login />}

            {logged && dropbox && <Profile user={data?.user as User} />}


            { logged && !dropbox && <Notification message="Por favor, conecta tu cuenta de Dropbox para continuar" type="error" /> }
            { !logged && <Notification message="Por favor, inicia sesión para continuar" type="error" /> }
        </div>
    )
}