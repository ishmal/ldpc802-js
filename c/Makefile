
CC=gcc
INC=-I./include
LIB=-Llib
CFLAGS=-Wall
OBJ=\
	obj/ldpc802.o

ALL: obj/ldpc802.a

obj/ldpc802.a: $(OBJ)
	ar vr $@ $(OBJ)

obj/ldpc802.o:
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.C

