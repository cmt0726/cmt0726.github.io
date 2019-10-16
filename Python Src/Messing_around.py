animals = ["dogs", "cats", "baboons", "bats"]


def lister(list):
    list[-1] = 'and ' + list[-1]
    print(', '.join(list))


lister(animals)
