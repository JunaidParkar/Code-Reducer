const dom = Dkit.init()

// input range, color not supported should be handles personally because of its needs

class formValidaator {
    constructor(form, options = {
        radio: {
            init: false,
            isAll: false,
            isGroup: false,
            el: null,
            numberOfRequired: 0
        },
        checkbox: {
            init: false,
            isAll: false,
            isGroup: false,
            el: [],
            numberOfRequired: 0
        }
    }) {
        this.form = form
        this.isForm = this.check()
        this.inputs = this.getAllInputs()
        this.options = options
        this.submitButton = this.getSubmitButton()
        console.log(this.submitButton)
    }

    check() {
        if (this.form.tagName != "FORM") {
            console.error("Invalid element, please use a <form> tag.")
            return false
        } else {
            return true
        }
    }

    getAllInputs() {
        if (this.isForm) {
            let inp = this.form.getElementsByTagName("input")
            let inp1 = Array.from(inp)
            if (inp1.length > 0) {
                return inp1
            }else {
                console.warn('No input found inside the form')
                return false
            }
        }
    }

    getSubmitButton() {
        if (this.isForm && this.inputs) {
            let submitButtons = []
            this.inputs.forEach((ele) => {
                if (ele.type == "submit") submitButtons.push(ele)
            })
            if (submitButtons.length > 1) {
                console.error("Multiple submit available. Only one is allowed")
                return false
            } else return true   
        }
    }

    validateOptions() {
        if (this.form && this.isForm && this.submitButton && this.inputs) {
            let b = true
            for (const key in this.options) {
                if (this.options[key].init && this.options[key].isGroup) {
                    console.error("isAll and isGroup cannot be true at same time. Please select only one from them.")
                    b = false
                    break
                }
                if (this.options[key].el.length <= 0 && this.options[key].init && this.options[key].isGroup) {
                    console.error(`${key} options are not given.`)
                    b = false
                    break
                }
                if (this.options[key].init && this.options[key].isGroup && this.options[key].numberOfRequired <=0) {
                    console.log("Please provide number of fields to get required. It should be more than 1")
                    b = false
                    break
                }
            }
            return b
        }
    }

    addRequire() {
        if (this.form && this.isForm && this.submitButton && this.inputs) {
            this.inputs.forEach((ele) => {
                if (ele.type != "radio" && ele.type != "submit" && ele.type != "range" && ele.type != "reset" && ele.type != "color" && ele.type != "checkbox" && ele.type != "button") {
                    ele.required = true
                } else ele.required = false
                if (ele.type == "submit" || ele.type == "button") {
                    ele.required = false
                }
                if ((this.options.radio.init && this.options.radio.isAll && ele.type == "radio") || this.options.checkbox.init && this.options.checkbox.isAll && ele.type == "checkbox") {
                    ele.required = true
                } else ele.required = false
            })

        }
    }

    init() {
        if (this.form && this.isForm && this.submitButton && this.inputs) {
            this.addRequire()
            let valid = this.validateOptions()
            if (valid) {
                this.form.onsubmit = (e) => {
                    e.preventDefault()
                }
            }
        }
    }
}

dom.id("form")

let f = new formValidaator(dom.get())
f.init()

// console.log(dom.get().tagName)

dom.revert()