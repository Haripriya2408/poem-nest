import Nav from "./Nav"
export default function Layout({children}){
    return(
        <div className=" mx-0 mt-7 md:max-w-7xl md:mx-auto font-popppins">
            <Nav/>
<main>{children}</main>
        </div>
    )
}