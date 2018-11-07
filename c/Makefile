
CC=gcc
CFLAGS=-Wall -g
INC=-Iinclude
LIB=-Lobj

OBJ=\
	obj/ldpc802.o \
	obj/ldpcEncoder.o \
	obj/codes.o \
	obj/crc32.o

DEPS=\
	include/ldpc802.h src/ldpc802.c \
	include/ldpcEncoder.h src/ldpcEncoder.c \
	include/codes.h src/codes.c \
	include/crc32.h src/crc32.c


ALL: obj/libldpc802.a

obj/libldpc802.a: $(OBJ)
	$(AR) rcs $@ $(OBJ)

obj/ldpc802.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpc802.c

obj/ldpcEncoder.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/ldpcEncoder.c

obj/codes.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/codes.c

obj/crc32.o: $(DEPS)
	$(CC) $(CFLAGS) $(INC) -c -o $@ src/crc32.c


clean:
	$(RM) obj/*

