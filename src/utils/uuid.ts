import short from "short-uuid"

const UUID = {
  get() {
    return short.generate()
  },
}

export { UUID }
