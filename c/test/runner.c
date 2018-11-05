#include "bunit.h"


extern Suite crcSuite;

static Suite* suites[] = {
	&crcSuite,
	(Suite *)0
};


int main(int argc, char **argv) {

	return bunitRun(suites);

}