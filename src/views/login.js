
import { Context } from "../store/context"
import { useContext } from "react"



const Login = () => {
    const {store,actions}= useContext(Context)

    return <div className="container mt-5">
        <form onSubmit={actions.handleSubmitLogin}>
            <img className="mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd0hitsZYPCwTxPK70de3v_3MEC4k_A6wQRxqsl42RZg&s" alt="" width="78" height="72" />
            <h1 className="h3 mb-3 fw-normal">Please log in</h1>

            <div className="form-floating">
                <input type="email" onChange={actions.handleOnchange} name="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" name="password"  onChange={actions.handleOnchange} className="form-control" id="floatingPassword" placeholder="Password"></input>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
        </form>
    </div>

}

export default Login