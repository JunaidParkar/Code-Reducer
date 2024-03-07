class FormValidator {
  constructor(
    form,
    isRequiredAll = false,
    requiredNone = [],
    option = [
      {
        type: "checkbox",
        allowed_from: [{ el: [], number_of_allowed: 0 }],
      },
      {
        type: "custom_required",
        func: null,
      },
    ]
  ) {
    this.form = form;
    this.isRequiredAll = isRequiredAll;
    this.isRequiredNone = requiredNone;
    this.options = option;
    this.toSetRequired = [
      "date",
      "datetime-local",
      "email",
      "file",
      "image",
      "number",
      "password",
      "tel",
      "text",
      "time",
      "url",
      "week",
      "hidden",
    ];
  }

  setRequired() {
    Array.from(this.form.getElementsByTagName("input")).forEach((tag) => {
      if (
        this.toSetRequired.includes(tag.type) &&
        !this.isRequiredNone.includes(tag)
      ) {
        for (const elem of this.options) {
          if (elem.type == "custom_required" && elem.func != null) {
            tag.setAttribute("isRequired", true);
            break;
          }
          if (elem.type == "custom_required" && elem.func == null) {
            tag.required = true;
            break;
          }
        }
      }
    });
  }

  verifyRequirement(obj) {
    if (obj.type == "checkbox") {
      obj.allowed_from.forEach((allowed_from) => {
        if (
          allowed_from.number_of_allowed > allowed_from.el.length ||
          allowed_from.number_of_allowed < 0
        ) {
          console.error(
            "Counting error: In options elements list should be greater than number of allowed elements"
          );
        } else {
          let clicked = [];
          allowed_from.el.forEach((element) => {
            element.onclick = () => {
              if (element.checked) {
                clicked.push(element);
                if (clicked.length > allowed_from.number_of_allowed) {
                  clicked.shift();
                }
                allowed_from.el.forEach((element2) => {
                  console.log(clicked);
                  if (clicked.includes(element2)) {
                    console.log(element2);
                    element2.checked = true;
                  } else {
                    element2.checked = false;
                  }
                });
              } else {
                element.checked = false;
                let newClicked = clicked.filter((item) => item !== element);
                clicked = newClicked;
              }
            };
          });
        }
      });
    }
  }

  validate(success) {
    this.setRequired();
    this.options.forEach((obj) => {
      this.verifyRequirement(obj);
    });
    this.form.onsubmit = (e) => {
      e.preventDefault();
      let err = false;
      for (const opt of this.options) {
        if (opt.type == "custom_required" && opt.func != null) {
          let inputs = Array.from(this.form.querySelectorAll("[isRequired]"));
          for (const inp of inputs) {
            if (inp.value.trim() == "") {
              opt.func(
                `Please proide value for ${inp.getAttribute("requiredName")}`
              );
              err = true;
              break;
            }
          }
          break;
        }
      }
      if (!err) {
        success();
      }
    };
  }
}


export default FormValidator