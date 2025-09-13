<?php

use PHPUnit\Framework\TestCase;

/**
 * Simple Test
 * Validates that PHPUnit testing framework is working correctly
 */
class SimpleTest extends TestCase
{
    /**
     * @test
     * Basic test to ensure PHPUnit is working
     */
    public function testPhpUnitIsWorking()
    {
        $this->assertTrue(true, 'PHPUnit should be working');
    }

    /**
     * @test
     * Test PHP version compatibility
     */
    public function testPhpVersionCompatibility()
    {
        $phpVersion = phpversion();
        $this->assertGreaterThanOrEqual('7.4', $phpVersion, 'PHP version should be 7.4 or higher');
    }

    /**
     * @test
     * Test that required functions exist
     */
    public function testRequiredFunctionsExist()
    {
        $this->assertTrue(function_exists('filter_var'), 'filter_var function should exist');
        $this->assertTrue(function_exists('trim'), 'trim function should exist');
        $this->assertTrue(function_exists('mail'), 'mail function should exist');
        $this->assertTrue(function_exists('getenv'), 'getenv function should exist');
    }

    /**
     * @test
     * Test array operations used in code
     */
    public function testArrayOperations()
    {
        $testArray = ['key1' => 'value1', 'key2' => 'value2'];
        
        $this->assertIsArray($testArray, 'Should be an array');
        $this->assertArrayHasKey('key1', $testArray, 'Should have key1');
        $this->assertEquals('value1', $testArray['key1'], 'Should have correct value');
    }

    /**
     * @test
     * Test string operations used in validation
     */
    public function testStringOperations()
    {
        $testString = '  test string  ';
        $trimmed = trim($testString);
        
        $this->assertEquals('test string', $trimmed, 'trim should work correctly');
        $this->assertIsString($trimmed, 'Result should be a string');
        $this->assertNotEmpty($trimmed, 'Result should not be empty');
    }
}