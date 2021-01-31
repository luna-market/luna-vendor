import { useHistory } from "react-router";

function Error() {
    const history = useHistory()
    history.push('/')

    return (
        <div>
            <h1>404 NOT FOUND</h1>
        </div>
    )

}

export default Error;