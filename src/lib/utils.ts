import path from "path";
import chalk from "chalk";

import { TimeRelative } from "./time";
import { TimeMonthToMilli } from "./time";
import { IPromptSelect, IRefinedListItem } from "./Interfaces";
import store from "../redux/index";
/**
 *
 * @param timeVal
 */
export function validDiff(timeVal) {
  const MinTimeThreshold = TimeMonthToMilli(store.getState().config.file_age);
  return timeVal >= MinTimeThreshold ? true : false;
}

/**
 *
 * @param List
 */
export function promptListParser(List: Object[]): Object[] {
  let ParsedList: Object[] = [];

  List.forEach((item: IRefinedListItem) => {
    let ItemObj: IPromptSelect = {
      title:
        path.relative(process.cwd(), item.path) +
        " -  " +
        chalk.yellow(TimeRelative(item.age) + " old"),
      value: item.path
    };
    ParsedList.push(ItemObj);
  });

  return ParsedList;
}

export function sortQueriesRefinedPath(RefinedFileList: IRefinedListItem[]) {
  RefinedFileList.sort(function(a: IRefinedListItem, b: IRefinedListItem) {
    const keyA = a.age;
    const keyB = b.age;
    // Compares the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return RefinedFileList;
}