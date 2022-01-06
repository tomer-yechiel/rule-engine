import { numberOfIndexes } from './facts/number_of_indexes';
import { numberOfRows } from './facts/number_of_rows'
import { primaryKey } from './facts/primary-key';

export const factsFetchers = [numberOfRows, numberOfIndexes, primaryKey];