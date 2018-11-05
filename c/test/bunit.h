#ifndef __BUNIT_H__
#define __BUNIT_H__

typedef char *(*TestFunc)(void);

typedef struct {
	char *description;
	TestFunc testFunc;
} Test;

typedef struct {
	char *description;
	Test* tests[];
} Suite;

int bunitRun(Suite* suites[]);

#define B_ASSERT(a, msg) if (!a) { return msg; }
#define B_ASSERT_EQ(a, b, msg) if (a != b) { return msg; }

#endif
