import apiService from "../../services/api.service";

const Version = {
    data () {
        return {
            version: "",
            current: ""
        }
    },
    created () {
        apiService.getVersion().then((result) => {
            this.version = result.version;
            this.current = result.current;
        })
    }
};

export default Version;