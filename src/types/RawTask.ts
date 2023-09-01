type RawTask = {
  header: string;
  content: string;
  deleteOnCompletion: boolean;
  group: string[];
};

export default RawTask;

export function newRawTask(
  header: string,
  content: string,
  deleteOnCompletion: boolean,
  group: string[]
): RawTask {
  return {
    header: header,
    content: content,
    deleteOnCompletion: deleteOnCompletion,
    group: group,
  };
}
