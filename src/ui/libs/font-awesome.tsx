import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function Icon({ icon }: { icon: IconProp }) {
  return <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
}
