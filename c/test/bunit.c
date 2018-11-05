#include <stdio.h>

#include "bunit.h"


int bunitRun(Suite* suites[]) {
	int nrErrors = 0;
	printf("######################\n");
	printf("### Tests starting\n");
	printf("######################\n");
	for (Suite **spp = suites; *spp; spp++) {
		Suite *s = *spp;
		printf("%s", s->description);
		for (Test **tpp; *tpp; tpp++) {
			Test *t = *tpp;
			printf("    %s", t->description);
			char *s = t->testFunc();
			if (*s) {
				printf("    %s", s);
				nrErrors++;
			}
		}
	}
	if (nrErrors) {
		printf("######################\n");
		printf("### Errors: %d", nrErrors);
		printf("######################\n");
		return -1;
	} else {
		printf("######################\n");
		printf("### No errors\n");
		printf("######################\n");
		return 0;
	}
}


