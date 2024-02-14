import TASKS from './tasks'
import STATUSES from './statuses'
import DIALOGS from './gialog'
import {getFullName} from "@/store/utils";

// для удобства обращения к модулям, создаем именованный роут
const FN_TASKS = getFullName(TASKS)
const FN_STATUSES = getFullName(STATUSES)
const FN_DIALOGS = getFullName(DIALOGS)

export {
  //обращаемся к константам внутри модуля
  TASKS,
  //используем именованный путь
  FN_TASKS,
  STATUSES,
  FN_STATUSES,
  DIALOGS,
  FN_DIALOGS
}