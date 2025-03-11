#tests/testfoo.py
from unittest import TestCase
import src.foo as foo
class T2(TestCase):
    def test_2(self):
        self.assertEqual( 0.5, foo.reciprocal(2) )
    def test_0(self):
        self.assertRaises( ZeroDivisionError,
                           foo.reciprocal, 0 )
    def test_ispositive1(self):
        self.assertTrue(foo.isPositive(4),
            "should return true when the value is positive")
    def test_ispositive2(self):
        self.assertFalse( foo.isPositive(-10),
            "should return false when the value is negative")
    def test_ispositive3(self):
        self.assertFalse( foo.isPositive(0),
            "should return false when the value is zero")
    def test_extraArgs(self):
        self.assertRaises( Exception, foo.isPositive, 4,-1 )
        self.assertRaises( Exception, foo.isPositive, 4,2,1 )
        self.assertRaises( Exception, foo.isPositive )
    def test_nonnumeric(self):
        self.assertRaises( Exception, foo.isPositive, "foo" )